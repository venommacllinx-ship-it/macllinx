"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Cloud, CloudRain, Sun, Snowflake, Wind, Droplets, MapPin, Clock, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  country: string;
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

// Helper function to get weather condition from WMO code
function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 85 && code <= 86) return "Snow Showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

// Helper function to get weather icon based on condition
function getWeatherIcon(condition: string) {
  if (condition.includes("Rain") || condition.includes("Drizzle")) {
    return <CloudRain className="w-6 h-6 text-blue-400" />;
  }
  if (condition.includes("Snow")) {
    return <Snowflake className="w-6 h-6 text-cyan-300" />;
  }
  if (condition.includes("Cloud") || condition.includes("Fog")) {
    return <Cloud className="w-6 h-6 text-gray-400" />;
  }
  return <Sun className="w-6 h-6 text-yellow-400" />;
}

// Time store for useSyncExternalStore
function createTimeStore() {
  let time = "";
  let date = "";
  let timezone = "";
  const listeners = new Set<() => void>();
  let interval: NodeJS.Timeout | null = null;

  const updateTime = () => {
    const now = new Date();
    time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    date = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    listeners.forEach(listener => listener());
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (listeners.size === 1) {
        updateTime();
        interval = setInterval(updateTime, 1000);
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && interval) {
          clearInterval(interval);
          interval = null;
        }
      };
    },
    getSnapshot() {
      return { time, date, timezone };
    }
  };
}

const timeStore = createTimeStore();

// Weather store for useSyncExternalStore
function createWeatherStore() {
  let state: WeatherState = { data: null, loading: true, error: null };
  const listeners = new Set<() => void>();

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const geoRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const geoData = await geoRes.json();
      const locationName = geoData.city || geoData.locality || geoData.principalSubdivision || "Unknown Location";
      const countryName = geoData.countryName || "";

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      const condition = getWeatherCondition(weatherData.current.weather_code);

      state = {
        data: {
          temperature: Math.round(weatherData.current.temperature_2m),
          condition,
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          location: locationName,
          country: countryName
        },
        loading: false,
        error: null
      };
      listeners.forEach(listener => listener());
    } catch {
      state = { data: null, loading: false, error: "Could not fetch weather" };
      listeners.forEach(listener => listener());
    }
  };

  // Initialize weather on first subscribe
  let initialized = false;

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!initialized) {
        initialized = true;
        if (typeof navigator !== "undefined" && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
              fetchWeather(40.7128, -74.0060); // Fallback to New York
            }
          );
        } else {
          state = { data: null, loading: false, error: "Geolocation not supported" };
          listeners.forEach(listener => listener());
        }
      }
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      return state;
    }
  };
}

const weatherStore = createWeatherStore();

export function TimeWeatherWidget() {
  const { time, date, timezone } = useSyncExternalStore(
    timeStore.subscribe,
    timeStore.getSnapshot,
    timeStore.getSnapshot
  );

  const { data: weather, loading, error } = useSyncExternalStore(
    weatherStore.subscribe,
    weatherStore.getSnapshot,
    weatherStore.getSnapshot
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Time Widget */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2 flex items-center gap-3">
        <div className="bg-purple-500/20 p-2 rounded-full">
          <Clock className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <div className="text-lg font-bold text-white font-mono">
            {time || "--:--:--"}
          </div>
          <div className="text-xs text-gray-400">
            {date}
          </div>
          {timezone && (
            <div className="text-[10px] text-purple-400">
              {timezone}
            </div>
          )}
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 flex items-center gap-3">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="animate-spin w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full" />
            <span className="text-sm">Loading weather...</span>
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">{error}</div>
        ) : weather ? (
          <>
            <div className="bg-cyan-500/20 p-2 rounded-full">
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-3 h-3 text-cyan-400" />
                <span className="text-lg font-bold text-white">
                  {weather.temperature}°C
                </span>
                <span className="text-xs text-gray-400">/ {Math.round(weather.temperature * 9/5 + 32)}°F</span>
              </div>
              <div className="text-xs text-cyan-400 font-medium">
                {weather.condition}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {weather.location}{weather.country ? `, ${weather.country}` : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3" />
                  {weather.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3 h-3" />
                  {weather.windSpeed} km/h
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
