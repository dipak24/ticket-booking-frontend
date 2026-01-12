import * as yup from 'yup';

/**
 * Booking form validation schema
 */
export const bookingSchema = yup.object().shape({
  userId: yup
    .string()
    .required('User ID is required')
    .min(3, 'User ID must be at least 3 characters'),
  
  concertId: yup
    .string()
    .required('Concert selection is required')
    .uuid('Invalid concert ID format'),
  
  items: yup
    .array()
    .of(
      yup.object().shape({
        ticketTierId: yup
          .string()
          .required('Ticket tier is required')
          .uuid('Invalid ticket tier ID'),
        quantity: yup
          .number()
          .required('Quantity is required')
          .min(1, 'Quantity must be at least 1')
          .max(10, 'Maximum 10 tickets per tier')
          .integer('Quantity must be a whole number'),
      })
    )
    .min(1, 'At least one ticket must be selected')
    .required('Ticket selection is required'),
});

/**
 * Ticket selector validation
 */
export const ticketSelectionSchema = yup.object().shape({
  quantity: yup
    .number()
    .required('Please select quantity')
    .min(1, 'Minimum 1 ticket')
    .max(10, 'Maximum 10 tickets per tier')
    .integer('Quantity must be a whole number'),
});

/**
 * User ID validation (for mock user selection)
 */
export const userIdSchema = yup.object().shape({
  userId: yup
    .string()
    .required('User ID is required')
    .min(3, 'User ID must be at least 3 characters'),
});

/**
 * Payment confirmation validation
 */
export const paymentSchema = yup.object().shape({
  paymentSuccess: yup
    .boolean()
    .required('Payment status is required'),
});