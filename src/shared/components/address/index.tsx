import React from 'react';
import { colors, Grid, TextField } from '@mui/material';
import * as yup from 'yup';

import { IAddress } from '../../interface/address.interface';
import { TAddressChangeData } from '../../types/address-change-data.type';

type TAddressValidationError = Partial<Record<keyof IAddress, string>>;

interface IUserAddressInputProps {
  address?: IAddress | null;
  isSubmitted: boolean;
  onChange: (data: TAddressChangeData) => void;
}

const addressSchema = yup.object({
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal Code is required'),
  countryId: yup.number(),
});

const Address: React.FC<IUserAddressInputProps> = ({
  address,
  isSubmitted,
  onChange,
}) => {
  const [addressData, setAddressData] = React.useState<IAddress>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    state: '',
  });

  const [errors, setErrors] = React.useState<TAddressValidationError | null>();

  React.useEffect(() => {
    if (address) {
      setAddressData(address);
    }
  }, [address]);

  const handleAddressDataChange = async () => {
    try {
      const hasAnyField = Object.values(addressData).some(
        (value: string) => value && value !== '',
      );
      if (hasAnyField) {
        await addressSchema.validate(addressData, {
          abortEarly: false,
        });
      }
      setErrors(null);
      onChange({
        isValid: true,
        addressData: hasAnyField ? { ...addressData, countryId: 210 } : null,
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationError: TAddressValidationError = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationError[error.path as keyof IAddress] = error.message;
          }
        });
        setErrors(validationError);
        onChange({ isValid: false, addressData: null, error: validationError });
      }
    }
  };

  React.useEffect(() => {
    handleAddressDataChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressData]);

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setAddressData({
      ...addressData,
      [name as keyof IAddress]: value ?? '',
    });
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={4} md={4} paddingRight="1rem">
        <Grid>
          <TextField
            className={`text-field Mui-focused ${isSubmitted && errors?.addressLine1 ? 'Mui-error' : ''}`}
            margin="normal"
            fullWidth
            id="address1"
            name="addressLine1"
            label="Address Line 1"
            autoComplete="address1"
            value={addressData?.addressLine1 || ''}
            onChange={inputChangedHandler}
          />
          {isSubmitted && errors?.addressLine1 && (
            <p style={{ color: colors.red[500], margin: '3px' }}>
              {errors.addressLine1}
            </p>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4} paddingRight="1rem">
        <Grid>
          <TextField
            className="text-field Mui-focused"
            margin="normal"
            fullWidth
            id="address2"
            label="Address Line 2"
            autoComplete="address1"
            name="addressLine2"
            value={addressData?.addressLine2 || ''}
            onChange={inputChangedHandler}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4} paddingRight="1rem">
        <Grid>
          <TextField
            className={`text-field Mui-focused ${isSubmitted && errors?.city ? 'Mui-error' : ''}`}
            margin="normal"
            fullWidth
            id="city"
            label="City"
            autoComplete="city"
            name="city"
            value={addressData?.city || ''}
            onChange={inputChangedHandler}
          />
          {isSubmitted && errors?.city && (
            <p style={{ color: colors.red[500], margin: '3px' }}>
              {errors.city}
            </p>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4} paddingRight="1rem">
        <Grid>
          <TextField
            className={`text-field Mui-focused ${isSubmitted && errors?.state ? 'Mui-error' : ''}`}
            margin="normal"
            fullWidth
            id="state"
            label="State/Province"
            autoComplete="state"
            name="state"
            value={addressData?.state || ''}
            onChange={inputChangedHandler}
          />
          {isSubmitted && errors?.state && (
            <p style={{ color: colors.red[500], margin: '3px' }}>
              {errors.state}
            </p>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4} paddingRight="1rem">
        <Grid>
          <TextField
            className={`text-field Mui-focused ${isSubmitted && errors?.postalCode ? 'Mui-error' : ''}`}
            margin="normal"
            fullWidth
            id="postalCode"
            label="Zip Code"
            autoComplete="postalCode"
            name="postalCode"
            value={addressData?.postalCode || ''}
            onChange={inputChangedHandler}
          />
          {isSubmitted && errors?.postalCode && (
            <p style={{ color: colors.red[500], margin: '3px' }}>
              {errors.postalCode}
            </p>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Address;
