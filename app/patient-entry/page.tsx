"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePatients } from "@/contexts/patient-context"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { PatientSidebar } from "@/components/dashboard/patient-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { ClipboardList, CheckCircle2 } from "lucide-react"

export default function PatientEntryPage() {
  const router = useRouter()
  const { addPatient } = usePatients()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    patientId: "",
    roomNumber: "",
    heartRate: "",
    bloodPressure: "",
    oxygenLevel: "",
    notes: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    // Simulate save delay, then add to store and show success
    setTimeout(() => {
      addPatient({
        patientName: formData.patientName,
        age: formData.age,
        gender: formData.gender,
        patientId: formData.patientId,
        roomNumber: formData.roomNumber,
        heartRate: formData.heartRate || "—",
        bloodPressure: formData.bloodPressure || "—",
        oxygenLevel: formData.oxygenLevel || "—",
        notes: formData.notes,
      })
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Patient data saved successfully",
        description: `${formData.patientName || "Patient"} has been added to the system.`,
      })
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardNavbar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <PatientSidebar />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Manual Patient Entry
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter patient information for nurses and physicians. All fields
                are recorded for clinical documentation.
              </p>
            </div>

            {isSubmitted ? (
              <Card className="border-chart-2/50 bg-chart-2/10">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="mb-4 h-16 w-16 text-chart-2" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Patient data saved successfully
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The patient has been added to the monitoring system.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Add Another Patient
                    </Button>
                    <Button onClick={() => router.push("/dashboard")}>
                      Return to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <CardTitle>Patient Information</CardTitle>
                  </div>
                  <CardDescription>
                    Complete all required fields. Vitals are recorded in
                    real-time units.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="patientName"
                          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Patient Name
                        </Label>
                        <Input
                          id="patientName"
                          name="patientName"
                          value={formData.patientName}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="rounded-lg"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="age"
                          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Age
                        </Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="0"
                          max="150"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Years"
                          className="rounded-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="gender"
                          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Gender
                        </Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, gender: value }))
                          }
                          required
                        >
                          <SelectTrigger className="w-full rounded-lg">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="patientId"
                          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Patient ID
                        </Label>
                        <Input
                          id="patientId"
                          name="patientId"
                          value={formData.patientId}
                          onChange={handleChange}
                          placeholder="MRN or unique ID"
                          className="rounded-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="roomNumber"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Room Number
                      </Label>
                      <Input
                        id="roomNumber"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        placeholder="e.g., 4A-12"
                        className="rounded-lg"
                        required
                      />
                    </div>

                    <div className="rounded-xl border border-border bg-secondary/50 p-4">
                      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Vital Signs
                      </h3>
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label
                            htmlFor="heartRate"
                            className="text-xs font-semibold text-muted-foreground"
                          >
                            Heart Rate (BPM)
                          </Label>
                          <Input
                            id="heartRate"
                            name="heartRate"
                            type="number"
                            min="0"
                            value={formData.heartRate}
                            onChange={handleChange}
                            placeholder="e.g., 72"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="bloodPressure"
                            className="text-xs font-semibold text-muted-foreground"
                          >
                            Blood Pressure (mmHg)
                          </Label>
                          <Input
                            id="bloodPressure"
                            name="bloodPressure"
                            value={formData.bloodPressure}
                            onChange={handleChange}
                            placeholder="e.g., 120/80"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="oxygenLevel"
                            className="text-xs font-semibold text-muted-foreground"
                          >
                            Oxygen Level (%)
                          </Label>
                          <Input
                            id="oxygenLevel"
                            name="oxygenLevel"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.oxygenLevel}
                            onChange={handleChange}
                            placeholder="e.g., 98"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="notes"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Clinical notes, observations, or additional information..."
                        className="min-h-24 rounded-lg"
                        rows={4}
                      />
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        size="lg"
                        className="rounded-lg"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="opacity-25"
                              />
                              <path
                                d="M4 12a8 8 0 018-8"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="opacity-75"
                              />
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          "Submit Patient Data"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard")}
                        className="rounded-lg"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      <footer className="flex items-center justify-between border-t border-border bg-card px-6 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Patient Entry • Clinical Documentation
        </span>
        <Link
          href="/dashboard"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Back to Dashboard
        </Link>
      </footer>
    </div>
  )
}
