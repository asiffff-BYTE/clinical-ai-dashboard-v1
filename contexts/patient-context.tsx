"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type RiskLevel = "normal" | "warning" | "critical"

export interface Patient {
  id: string
  patientName: string
  age: string
  gender: string
  patientId: string
  roomNumber: string
  heartRate: string
  bloodPressure: string
  oxygenLevel: string
  notes: string
  createdAt: number
}

interface PatientContextValue {
  patients: Patient[]
  addPatient: (data: Omit<Patient, "id" | "createdAt">) => Patient
  selectedPatientId: string | null
  setSelectedPatient: (id: string | null) => void
  selectedPatient: Patient | null
}

const PatientContext = createContext<PatientContextValue | null>(null)

const INITIAL_PATIENT: Patient = {
  id: "seed-1",
  patientName: "Rajesh Sharma",
  age: "64",
  gender: "male",
  patientId: "12345678",
  roomNumber: "4A-12",
  heartRate: "112",
  bloodPressure: "94/62",
  oxygenLevel: "91",
  notes: "Sepsis risk monitoring. Lactate elevated.",
  createdAt: Date.now() - 86400000,
}

function generateId() {
  return `patient-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([INITIAL_PATIENT])
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    INITIAL_PATIENT.id
  )

  const addPatient = useCallback((data: Omit<Patient, "id" | "createdAt">) => {
    const patient: Patient = {
      ...data,
      id: generateId(),
      createdAt: Date.now(),
    }
    setPatients((prev) => {
      const next = [...prev, patient]
      return next
    })
    setSelectedPatientId(patient.id)
    return patient
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prev) =>
        prev.map((p) => {
          const hr = parseInt(p.heartRate, 10)
          const o2 = parseInt(p.oxygenLevel, 10)
          const bp = p.bloodPressure.trim().match(/^(\d+)\s*\/\s*(\d+)$/)
          const sys = bp ? parseInt(bp[1], 10) : 94
          const dia = bp ? parseInt(bp[2], 10) : 62
          const delta = () => (Math.random() - 0.5) * 2
          const newHr = Math.max(60, Math.min(180, (Number.isNaN(hr) ? 80 : hr) + Math.round(delta())))
          const newO2 = Math.max(80, Math.min(100, (Number.isNaN(o2) ? 95 : o2) + Math.round(delta() * 0.5)))
          const newSys = Math.max(70, Math.min(180, sys + Math.round(delta())))
          const newDia = Math.max(40, Math.min(120, dia + Math.round(delta() * 0.5)))
          return {
            ...p,
            heartRate: String(newHr),
            oxygenLevel: String(newO2),
            bloodPressure: `${newSys}/${newDia}`,
          }
        })
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId) ?? patients[0] ?? null,
    [patients, selectedPatientId]
  )

  const value: PatientContextValue = useMemo(
    () => ({
      patients,
      addPatient,
      selectedPatientId,
      setSelectedPatient: setSelectedPatientId,
      selectedPatient,
    }),
    [patients, addPatient, selectedPatientId, selectedPatient]
  )

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  )
}

export function usePatients() {
  const ctx = useContext(PatientContext)
  if (!ctx) {
    throw new Error("usePatients must be used within PatientProvider")
  }
  return ctx
}

/** Parse BP string "120/80" to { sys, dia }, and compute MAP = (SBP + 2*DBP)/3 */
export function parseBloodPressure(bp: string): { sys: number; dia: number; map: number } | null {
  const match = bp.trim().match(/^(\d+)\s*\/\s*(\d+)$/)
  if (!match) return null
  const sys = parseInt(match[1], 10)
  const dia = parseInt(match[2], 10)
  const map = Math.round((sys + 2 * dia) / 3)
  return { sys, dia, map }
}

/** Classify risk level: SpO2 >95=Normal, 90-95=Warning, <90=Critical; HR >140=Critical, >120=Warning */
export function getRiskLevel(patient: Patient | null): RiskLevel {
  if (!patient) return "normal"
  const o2 = parseInt(patient.oxygenLevel, 10)
  const hr = parseInt(patient.heartRate, 10)
  const o2Critical = !Number.isNaN(o2) && o2 < 90
  const o2Warning = !Number.isNaN(o2) && o2 >= 90 && o2 <= 95
  const hrCritical = !Number.isNaN(hr) && hr > 140
  const hrWarning = !Number.isNaN(hr) && hr > 120 && hr <= 140
  if (o2Critical || hrCritical) return "critical"
  if (o2Warning || hrWarning) return "warning"
  return "normal"
}

/** Returns true when vitals reach Critical (SpO2 < 90 or HR > 140) */
export function hasVitalRisk(patient: Patient | null): boolean {
  return getRiskLevel(patient) === "critical"
}
