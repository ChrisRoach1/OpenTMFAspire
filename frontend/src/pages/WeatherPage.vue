<script setup lang="ts">
import { IconAlertCircle, IconRefresh } from '@tabler/icons-vue'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface WeatherForecast {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

const weatherData = ref<WeatherForecast[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const useCelsius = ref(false)

const fetchWeatherForecast = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/weatherforecast')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: WeatherForecast[] = await response.json()
    weatherData.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch weather data'
    console.error('Error fetching weather forecast:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWeatherForecast()
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="px-4 py-4 md:py-6 lg:px-6">
    <Card aria-labelledby="weather-heading">
      <CardHeader>
        <CardTitle id="weather-heading">
          Weather Forecast
        </CardTitle>
        <CardDescription>Five-day forecast from the server API</CardDescription>
        <CardAction class="flex items-center gap-2">
          <fieldset
            class="bg-muted flex rounded-md p-0.5"
            aria-label="Temperature unit selection"
          >
            <legend class="sr-only">
              Temperature unit
            </legend>
            <Button
              size="sm"
              :variant="useCelsius ? 'ghost' : 'outline'"
              :aria-pressed="!useCelsius"
              type="button"
              @click="useCelsius = false"
            >
              <span aria-hidden="true">°F</span>
              <span class="sr-only">Fahrenheit</span>
            </Button>
            <Button
              size="sm"
              :variant="useCelsius ? 'outline' : 'ghost'"
              :aria-pressed="useCelsius"
              type="button"
              @click="useCelsius = true"
            >
              <span aria-hidden="true">°C</span>
              <span class="sr-only">Celsius</span>
            </Button>
          </fieldset>
          <Button
            size="sm"
            :disabled="loading"
            :aria-label="loading ? 'Loading weather forecast' : 'Refresh weather forecast'"
            type="button"
            @click="fetchWeatherForecast"
          >
            <IconRefresh
              :class="{ 'animate-spin': loading }"
              aria-hidden="true"
            />
            <span>{{ loading ? 'Loading...' : 'Refresh' }}</span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent class="flex flex-col gap-4">
        <div
          v-if="error"
          class="border-destructive/50 bg-destructive/10 text-destructive flex items-center gap-2 rounded-md border px-4 py-3 text-sm"
          role="alert"
          aria-live="polite"
        >
          <IconAlertCircle
            class="size-5 shrink-0"
            aria-hidden="true"
          />
          <span>{{ error }}</span>
        </div>

        <div
          v-if="loading && weatherData.length === 0"
          class="grid grid-cols-1 gap-4 @xl/main:grid-cols-3 @5xl/main:grid-cols-5"
          role="status"
          aria-live="polite"
          aria-label="Loading weather data"
        >
          <Skeleton
            v-for="i in 5"
            :key="i"
            class="h-36 rounded-xl"
            aria-hidden="true"
          />
          <span class="sr-only">Loading weather forecast data...</span>
        </div>

        <div
          v-if="weatherData.length > 0"
          class="grid grid-cols-1 gap-4 @xl/main:grid-cols-3 @5xl/main:grid-cols-5"
        >
          <article
            v-for="(forecast, index) in weatherData"
            :key="index"
            :aria-label="`Weather for ${formatDate(forecast.date)}`"
          >
            <Card class="from-primary/5 to-card h-full gap-3 bg-gradient-to-t shadow-xs">
              <CardHeader>
                <CardDescription class="uppercase tracking-wide">
                  <time :datetime="forecast.date">{{ formatDate(forecast.date) }}</time>
                </CardDescription>
                <CardTitle class="text-base">
                  {{ forecast.summary }}
                </CardTitle>
              </CardHeader>
              <CardContent
                class="flex flex-col"
                :aria-label="`Temperature: ${useCelsius ? forecast.temperatureC : forecast.temperatureF} degrees ${useCelsius ? 'Celsius' : 'Fahrenheit'}`"
              >
                <span
                  class="text-3xl font-semibold tabular-nums"
                  aria-hidden="true"
                >{{ useCelsius ? forecast.temperatureC : forecast.temperatureF }}°</span>
                <span
                  class="text-muted-foreground text-sm"
                  aria-hidden="true"
                >{{ useCelsius ? 'Celsius' : 'Fahrenheit' }}</span>
              </CardContent>
            </Card>
          </article>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
