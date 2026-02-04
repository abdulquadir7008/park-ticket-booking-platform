import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management and validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @returns {Object} Form state and methods
 */
const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Handle input change
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  /**
   * Handle input blur
   */
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field
    if (validate) {
      const fieldErrors = validate({ [name]: values[name] });
      if (fieldErrors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: fieldErrors[name],
        }));
      }
    }
  }, [validate, values]);

  /**
   * Set a specific field value
   */
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * Validate all fields
   */
  const validateForm = useCallback(() => {
    if (!validate) return true;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [validate, values]);

  /**
   * Handle form submit
   */
  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault();

      const isValid = validateForm();

      if (isValid) {
        onSubmit(values);
      } else {
        // Mark all fields as touched to show errors
        const allTouched = Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        setTouched(allTouched);
      }
    };
  }, [validateForm, values]);

  /**
   * Reset form
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    validateForm,
  };
};

export default useForm;