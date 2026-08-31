export const REQUEST_TYPES = [
  'Transcript Request',
  'Certificate of Enrollment',
  'Good Moral Certificate',
  'ID Replacement',
  'Grade Correction',
  'Facility Reservation',
  'Maintenance Report',
]

export const REQUEST_STATUS = {
  pending: { label: 'Pending', tone: 'warning' },
  in_review: { label: 'In Review', tone: 'info' },
  completed: { label: 'Completed', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'danger' },
}

export const mockRequests = [
  {
    id: 'REQ-1024',
    type: 'Transcript Request',
    office: "Registrar's Office",
    status: 'pending',
    submitted: '2026-08-27',
    updated: '2026-08-27',
    description: 'Official transcript of records for scholarship application, 2 copies.',
  },
  {
    id: 'REQ-1023',
    type: 'Certificate of Enrollment',
    office: "Registrar's Office",
    status: 'completed',
    submitted: '2026-08-21',
    updated: '2026-08-23',
    description: 'Certificate of enrollment for the current semester, for a part-time job application.',
  },
  {
    id: 'REQ-1022',
    type: 'ID Replacement',
    office: 'Student Affairs',
    status: 'in_review',
    submitted: '2026-08-19',
    updated: '2026-08-22',
    description: 'Lost student ID, requesting replacement. Affidavit of loss attached.',
  },
  {
    id: 'REQ-1021',
    type: 'Facility Reservation',
    office: 'Facilities Office',
    status: 'completed',
    submitted: '2026-08-12',
    updated: '2026-08-14',
    description: 'Reserve the AVR for an org general assembly, Aug 20, 1–4 PM.',
  },
  {
    id: 'REQ-1020',
    type: 'Grade Correction',
    office: "Registrar's Office",
    status: 'rejected',
    submitted: '2026-08-05',
    updated: '2026-08-09',
    description: 'Requesting review of final grade for CS 301 — possible encoding error.',
  },
  {
    id: 'REQ-1019',
    type: 'Maintenance Report',
    office: 'Facilities Office',
    status: 'in_review',
    submitted: '2026-08-02',
    updated: '2026-08-04',
    description: 'Flickering lights in Room 214, second floor of the Engineering building.',
  },
  {
    id: 'REQ-1018',
    type: 'Good Moral Certificate',
    office: 'Student Affairs',
    status: 'completed',
    submitted: '2026-07-29',
    updated: '2026-07-31',
    description: 'Good moral certificate needed for transfer application to another university.',
  },
]

export const mockOffices = [
  "Registrar's Office",
  'Student Affairs',
  'Facilities Office',
  "Guidance Office",
  'Accounting Office',
]
