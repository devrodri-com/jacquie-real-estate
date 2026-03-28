"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { Country } from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";

interface CountryOption {
  value: Country | undefined;
  label: string;
}

interface CountryLabel {
  [key: string]: string;
}

interface CustomCountrySelectProps {
  value?: Country;
  onChange: (country: Country | undefined) => void;
  options: CountryOption[];
  labels?: CountryLabel;
  countries?: readonly Country[];
  isEN: boolean;
  isFR?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function CountrySelect({
  value,
  onChange,
  options,
  labels,
  countries,
  isEN,
  isFR = false,
  ...props
}: CustomCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string | number, HTMLButtonElement>>(new Map());

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Filtrar opciones según búsqueda (excluyendo International de react-phone-number-input)
  const filteredOptions = useMemo(() => {
    // Primero filtrar siempre las opciones donde value === undefined (International de react-phone-number-input)
    const optionsWithoutInternational = options.filter((option) => option.value !== undefined);
    
    if (!search.trim()) return optionsWithoutInternational;

    const searchLower = search.toLowerCase();
    return optionsWithoutInternational.filter((option) => {
      const label = option.label.toLowerCase();
      const value = option.value || "";
      return label.includes(searchLower) || value.toLowerCase().includes(searchLower);
    });
  }, [options, search]);

  // Lista completa de opciones: International (index 0) + filteredOptions (index 1+)
  const allOptions = useMemo(() => {
    const intlLabel = isEN ? "International" : isFR ? "International" : "Internacional";
    return [
      { value: undefined, label: intlLabel, isInternational: true },
      ...filteredOptions,
    ];
  }, [filteredOptions, isEN, isFR]);

  // Inicializar activeIndex al abrir
  useEffect(() => {
    if (!open) return;
    
    // Buscar el índice del país seleccionado
    if (value !== undefined) {
      const index = filteredOptions.findIndex((opt) => opt.value === value);
      if (index !== -1) {
        setActiveIndex(index + 1); // +1 porque International está en 0
      } else {
        setActiveIndex(0); // International si no se encuentra
      }
    } else {
      setActiveIndex(0); // International
    }
  }, [open, value, filteredOptions]);

  // Ajustar activeIndex cuando cambia el filtro
  useEffect(() => {
    if (!open) return;
    
    setActiveIndex((prevIndex) => {
      // Si el índice activo está fuera de rango, ajustarlo
      if (prevIndex >= allOptions.length) {
        return Math.max(0, allOptions.length - 1);
      }
      
      // Si el país seleccionado está en las opciones filtradas, activarlo
      if (value !== undefined) {
        const index = filteredOptions.findIndex((opt) => opt.value === value);
        if (index !== -1) {
          return index + 1;
        }
      }
      
      return prevIndex;
    });
  }, [filteredOptions, allOptions.length, open, value]);

  // Scroll a la opción activa
  useEffect(() => {
    if (!open || activeIndex < 0 || activeIndex >= allOptions.length) return;
    
    const option = allOptions[activeIndex];
    const key = option.value || 'intl';
    const element = optionRefs.current.get(key);
    
    if (element) {
      element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeIndex, allOptions, open]);

  // Focus en el input de búsqueda cuando se abre
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Manejar teclado en el input de búsqueda
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, allOptions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < allOptions.length) {
          const option = allOptions[activeIndex];
          handleSelect(option.value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setSearch("");
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(allOptions.length - 1);
        break;
    }
  };

  const handleSelect = (country: Country | undefined) => {
    onChange(country);
    setOpen(false);
    setSearch("");
  };

  // Helper para obtener ID de opción
  const getOptionId = (country: Country | undefined) => {
    return `country-opt-${country || 'intl'}`;
  };

  // Helper para obtener opción activa
  const activeOption = activeIndex >= 0 && activeIndex < allOptions.length ? allOptions[activeIndex] : null;
  const activeOptionId = activeOption ? getOptionId(activeOption.value) : undefined;

  // Opción International
  const internationalLabel = isEN ? "International" : isFR ? "International" : "Internacional";
  const searchPlaceholder = isEN ? "Search country..." : isFR ? "Rechercher un pays..." : "Buscar país...";
  const manualEntryLabel = isEN ? "Manual entry" : isFR ? "Saisie manuelle" : "Ingreso manual";
  const noCountriesLabel = isEN ? "No countries found" : isFR ? "Aucun pays trouvé" : "No se encontraron países";
  const selectCountryAria = isEN ? "Select country" : isFR ? "Sélectionner un pays" : "Seleccionar país";
  
  // ID del listbox
  const listboxId = "country-listbox";

  return (
    <div ref={containerRef} className={`relative min-w-0 ${props.className || ""}`}>
      {/* Botón selector */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={props.disabled}
        className="flex min-w-0 items-center gap-2 h-11 px-3 rounded-md border border-primary-foreground/20 bg-white text-primary text-sm font-medium hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={selectCountryAria}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {value ? (
          <>
            <span className="shrink-0 text-xl">{getCountryEmoji(value)}</span>
            <span className="hidden min-w-0 flex-1 truncate sm:inline">
              {labels?.[value] ?? value}
            </span>
            <span className="shrink-0 text-primary/60">+{getCountryCallingCode(value)}</span>
          </>
        ) : (
          <>
            <span className="shrink-0 text-xl">🌐</span>
            <span className="hidden min-w-0 flex-1 truncate sm:inline">
              {internationalLabel}
            </span>
            <span className="shrink-0 text-primary/60">+</span>
          </>
        )}
        <svg
          className={`w-4 h-4 shrink-0 ml-auto transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-[280px] sm:w-[320px] bg-white rounded-md border border-primary/10 shadow-xl ring-1 ring-black/5 max-h-[320px] flex flex-col">
          {/* Búsqueda */}
          <div className="p-2 border-b border-primary/10">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full h-9 px-3 rounded-md border border-primary/10 bg-white text-primary text-sm placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-controls={listboxId}
              aria-activedescendant={activeOptionId}
              aria-autocomplete="list"
            />
          </div>

          {/* Lista de países */}
          <div
            ref={listboxRef}
            id={listboxId}
            className="overflow-y-auto flex-1"
            role="listbox"
          >
            {/* Opción International (siempre primera) */}
            <button
              key="intl"
              ref={(el) => {
                if (el) optionRefs.current.set('intl', el);
                else optionRefs.current.delete('intl');
              }}
              type="button"
              id={getOptionId(undefined)}
              onClick={() => handleSelect(undefined)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-primary/5 transition-colors ${
                value === undefined ? "bg-accent/10 font-medium" : ""
              } ${activeIndex === 0 ? "bg-accent/20" : ""}`}
              role="option"
              aria-selected={value === undefined}
            >
              <span className="text-xl">🌐</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-primary">{internationalLabel}</div>
                <div className="text-xs text-primary/60">{manualEntryLabel}</div>
              </div>
            </button>

            {/* Divider */}
            {filteredOptions.length > 0 && <div className="h-px bg-primary/10 my-1" />}

            {/* Países filtrados */}
            {filteredOptions.map((option, index) => {
              const country = option.value;
              if (!country) return null;
              
              const optionId = getOptionId(country);
              const isSelected = value === country;
              const isActive = index + 1 === activeIndex; // +1 porque International está en 0
              const callingCode = getCountryCallingCode(country);
              const label = option.label || (labels?.[country] ?? country);

              return (
                <button
                  key={country}
                  ref={(el) => {
                    if (el) optionRefs.current.set(country, el);
                    else optionRefs.current.delete(country);
                  }}
                  type="button"
                  id={optionId}
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-primary/5 transition-colors ${
                    isSelected ? "bg-accent/10 font-medium" : ""
                  } ${isActive ? "bg-accent/20" : ""}`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="text-xl flex-shrink-0">{getCountryEmoji(country)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-primary truncate">{label}</div>
                  </div>
                  <span className="text-xs text-primary/60 flex-shrink-0">+{callingCode}</span>
                </button>
              );
            })}
            
            {filteredOptions.length === 0 && (
              <div className="px-3 py-4 text-center text-sm text-primary/60">
                {noCountriesLabel}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Función helper para obtener emoji de país
function getCountryEmoji(country: Country): string {
  const codePoints = country
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
