"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

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

/** Returns true if patient has risk: O2 < 90 or HR > 110 */
export function hasVitalRisk(patient: Patient | null): boolean {
  if (!patient) return false
  const o2 = parseInt(patient.oxygenLevel, 10)
  const hr = parseInt(patient.heartRate, 10)
  if (!Number.isNaN(o2) && o2 < 90) return true
  if (!Number.isNaN(hr) && hr > 110) return true
  return false
}
