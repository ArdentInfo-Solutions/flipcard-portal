"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

interface LocationSearchProps {
  initialValue: string
  onSelect: (location: string) => void
}

// Mock location data for demonstration
const MOCK_LOCATIONS = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Miami, FL",
  "Denver, CO",
  "Las Vegas, NV",
  "Atlanta, GA",
  "Portland, OR",
  "San Jose, CA",
  "Nashville, TN",
]

export function LocationSearch({ initialValue, onSelect }: LocationSearchProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    // Add click outside listener to close suggestions
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim() === "") {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    // Filter locations based on input
    const filteredLocations = MOCK_LOCATIONS.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase()),
    ).slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filteredLocations)
    setIsOpen(filteredLocations.length > 0)
  }

  const handleSelectLocation = (location: string) => {
    setInputValue(location)
    onSelect(location)
    setIsOpen(false)
  }

  // In a real application, you would implement debounced API calls to a geocoding service
  // like Google Places API or Mapbox Geocoding API

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your location"
          onFocus={() => inputValue.trim() !== "" && setSuggestions.length > 0 && setIsOpen(true)}
          className="pl-10"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {suggestions.map((location, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSelectLocation(location)}
              >
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

