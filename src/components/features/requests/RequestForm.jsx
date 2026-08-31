import { useState } from 'react'
import { UploadCloud, Send } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'

export default function RequestForm({ offices, requestTypes, onSubmitted }) {
  const [fileName, setFileName] = useState(null)
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
    setSubmitting(true)

    const form = event.target
    const body = new FormData()
    body.set('request_type_id', form.elements['request-type'].value)
    body.set('office_id', form.elements.office.value)
    body.set('subject', form.elements.subject.value)
    body.set('details', form.elements.details.value)
    if (file) body.set('attachment', file)

    try {
      await api.post('/requests', body, { isFormData: true })
      setSubmitted(true)
      form.reset()
      setFile(null)
      setFileName(null)
      onSubmitted?.()
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        setFieldErrors(err.errors)
      } else {
        setError(err instanceof ApiError ? err.message : 'Could not submit your request. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Select id="request-type" name="request-type" label="Request type" required defaultValue="">
          <option value="" disabled>
            Choose a request type
          </option>
          {requestTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Select>

        <Select id="office" name="office" label="Send to office" required defaultValue="">
          <option value="" disabled>
            Choose an office
          </option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </Select>
      </div>

      <Input
        id="subject"
        name="subject"
        label="Subject / purpose"
        placeholder="e.g. Transcript request for scholarship application "
        required
      />
      {fieldErrors.subject && <p className="-mt-3 text-xs text-danger">{fieldErrors.subject[0]}</p>}

      <Textarea
        id="details"
        name="details"
        label="Details"
        placeholder="Tell the office what you need, including any reference numbers or deadlines."
        required
      />
      {fieldErrors.details && <p className="-mt-3 text-xs text-danger">{fieldErrors.details[0]}</p>}

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink">Attachment (optional)</span>
        <label
          htmlFor="attachment"
          className="focus-ring flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong bg-paper px-4 py-8 text-center hover:border-navy"
        >
          <UploadCloud className="h-6 w-6 text-ink-faint" />
          <span className="text-sm text-ink-muted">
            {fileName ?? 'Click to upload, or drag a file here'}
          </span>
          <span className="text-xs text-ink-faint">PDF, JPG or PNG — up to 10MB</span>
          <input
            id="attachment"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null
              setFile(f)
              setFileName(f?.name ?? null)
            }}
          />
        </label>
        {fieldErrors.attachment && <p className="mt-1.5 text-xs text-danger">{fieldErrors.attachment[0]}</p>}
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-border pt-5">
        <p className="text-xs text-ink-faint">
          You'll get a notification once the office updates your request.
        </p>
        <Button type="submit" icon={Send} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit request'}
        </Button>
      </div>

      {submitted && (
        <p role="status" className="rounded-lg bg-success-tint px-4 py-3 text-sm font-medium text-success">
          Request submitted — track its status from My Requests.
        </p>
      )}
    </form>
  )
}
