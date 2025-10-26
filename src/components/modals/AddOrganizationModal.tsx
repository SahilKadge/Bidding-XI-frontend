"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog"
import { useDispatch, useSelector } from "react-redux"
import { createOrganization, clearOrganizationState } from "../../redux/organizationSlice"

import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { AppDispatch, RootState } from "../../redux/store"

interface AddOrganizationModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, successMessage } = useSelector((state: RootState) => state.organization)

  const [organizationName, setOrganizationName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      organizationName,
      email,
      password,
      phone,
      address,
    }

    await dispatch(createOrganization(payload))

    if (!error) {
      onClose()
      dispatch(clearOrganizationState())
      setOrganizationName("")
      setEmail("")
      setPassword("")
      setPhone("")
      setAddress("")
    }
  }
  if(error){
    return (
      <p className="text-sm text-destructive">
  {typeof error === "string" ? error : error || "Something went wrong"}
</p>
    )
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-semibold text-foreground">Add New Organization</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new organization workspace for your team
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <AlertCircle className="size-5 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-3 rounded-lg border border-chart-3/30 bg-chart-3/10 p-3">
            <CheckCircle2 className="size-5 text-chart-3" />
            <p className="text-sm text-chart-3">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="org-name" className="text-foreground font-medium">
              Organization Name
            </Label>
            <Input
              id="org-name"
              placeholder="Enter organization name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="border-border bg-input/50 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50"
              required
            />
          </div>

          {/* Admin Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Admin Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@organization.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border bg-input/50 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border bg-input/50 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50"
              required
            />
          </div>

          {/* Phone (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Phone <span className="text-muted-foreground text-xs">(Optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-border bg-input/50 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50"
            />
          </div>

          {/* Address (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground font-medium">
              Address <span className="text-muted-foreground text-xs">(Optional)</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="123 Business Street, City, State"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-border bg-input/50 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/50"
            />
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground hover:bg-accent/50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Creating...
                </span>
              ) : (
                "Create Organization"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddOrganizationModal
