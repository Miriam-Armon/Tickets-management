export const TICKET_FORM_CONSTANTS = {
  title: 'צור פניה',
  labels: {
    subject: 'נושא',
    description: 'תיאור',
    userId: 'תעודת זהות'
  },
  placeholders: {
    subject: 'נושא',
    description: 'תיאור',
    userId: 'תעודת זהות (9 ספרות)'
  },
  validation: {
    subjectRequired: 'נושא הינו שדה חובה.',
    userIdRequired: 'תעודת זהות הינה שדה חובה.',
    userIdPattern: 'תעודת זהות חייבת להכיל בדיוק 9 ספרות.',
    formInvalid: 'אנא מלא/י את כל השדות הנדרשים כראוי.',
    formMissing: 'אנא מלא/י את כל השדות הנדרשים.'
  },
  actions: {
    cancel: 'ביטול',
    submit: 'שלח'
  },
  notification: {
    ticketAdded: 'הפניה נוספה בהצלחה'
  },
  errors: {
    createFailed: 'יצירת הפניה נכשלה.'
  }
};
