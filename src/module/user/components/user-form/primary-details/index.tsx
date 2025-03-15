import React, { useRef } from 'react';
import { Autocomplete, Button, colors, Grid, TextField } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { toast } from 'react-toastify';

import { EUserRole } from '../../../../../shared/enums/user-role.enum';
import { TUserFormValue } from '../../../types/user-input-props.type';
import { useFormContext } from 'react-hook-form';
import { EUserActionMode } from '../../../enums/user-action-mode.enum';
import { IUserDetail } from '../../../interface/user-detail.interface';
import profileImage from '../../../../../assets/images/profile-image.png';

interface IUserRole {
  label: string;
  value: EUserRole;
  isVisible: boolean;
}

interface IPrimaryDetailsInputProps {
  user: IUserDetail | null;
  mode?: EUserActionMode;
}

const PrimaryDetails: React.FC<IPrimaryDetailsInputProps> = ({
  user,
  mode,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<TUserFormValue>();
  const [selectedOption, setSelectedOption] = React.useState<IUserRole | null>(
    null,
  );
  const [imageUrl, setImageUrl] = React.useState<string>(profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userRoles: IUserRole[] = [
    { label: 'Super Admin', value: EUserRole.SuperAdmin, isVisible: false },
    { label: 'Company Admin', value: EUserRole.CompanyAdmin, isVisible: false },
    {
      label: 'Company Manager',
      value: EUserRole.CompanyManager,
      isVisible: true,
    },
    { label: 'Operator', value: EUserRole.Operator, isVisible: true },
    { label: 'Technician', value: EUserRole.Technician, isVisible: true },
    { label: 'Customer', value: EUserRole.Customer, isVisible: false },
  ];

  const visibleRoles = userRoles.filter((role) => role.isVisible);

  const handleRoleChange = (
    _: React.SyntheticEvent,
    newValue: IUserRole | null,
  ) => {
    setSelectedOption(newValue);
    setValue('roles', newValue ? [newValue.value] : []);
    clearErrors('roles');
  };

  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setValue('file', file);
          setImageUrl(reader.result as string);
          setValue('file', file || undefined);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select a PNG or JPG file.');
      }
    }
  };

  React.useEffect(() => {
    setValue('firstName', user?.firstName || '');
    setValue('lastName', user?.lastName || '');
    setValue('email', user?.email || '');
    setValue('phoneNumber', user?.phoneNumber || '');
    setValue('roles', user?.roles || []);

    if (user?.roles && user.roles.length > 0) {
      const userRole = userRoles.find((role) => role.value === user.roles[0]);
      setSelectedOption(userRole || null);
    }
    if (user?.imageUrl) {
      setImageUrl(user.imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Grid container className="primary-details-form">
      <Grid item xs={12} sm={4} className="image-content">
        <img src={imageUrl} alt="user card image" className="user-image" />
        <Grid>
          <Button
            type="button"
            variant="contained"
            className="image-upload-btn"
            startIcon={<FileUploadOutlinedIcon />}
            onClick={handleButtonClick}
          >
            Upload
          </Button>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid item xs={12} sm={6} className="form-filed-drop-down">
          <Autocomplete
            fullWidth
            id="userRole"
            options={visibleRoles}
            getOptionLabel={(option) => option.label}
            value={selectedOption}
            onChange={handleRoleChange}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Role"
                margin="normal"
                fullWidth
                autoComplete="userRole"
                autoFocus
                className={`text-field Mui-focused ${errors.roles ? 'Mui-error' : ''}`}
              />
            )}
          />
          {errors?.roles && (
            <p style={{ color: colors.red[500], margin: '3px' }}>
              {errors.roles.message}
            </p>
          )}
        </Grid>
        <Grid item xs={12} className="form-filed">
          <Grid item xs={12}>
            <TextField
              key={user?.firstName}
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              autoComplete="firstName"
              {...register('firstName')}
              className={`text-field Mui-focused ${errors.firstName ? 'Mui-error' : ''}`}
            />
            {errors?.firstName && (
              <p style={{ color: colors.red[500], margin: '3px' }}>
                {errors.firstName.message}
              </p>
            )}
          </Grid>
          <TextField
            key={user?.lastName}
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            autoComplete="lastName"
            {...register('lastName')}
            className={`text-field Mui-focused`}
          />
        </Grid>
        <Grid item xs={12} className="form-filed">
          <Grid item xs={12}>
            <TextField
              key={user?.email}
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              {...register('email')}
              disabled={mode === EUserActionMode.Edit}
              className={`text-field Mui-focused ${errors.email ? 'Mui-error' : ''}`}
            />
            {errors?.email && (
              <p style={{ color: colors.red[500], margin: '3px' }}>
                {errors.email.message}
              </p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              key={user?.phoneNumber}
              margin="normal"
              fullWidth
              id="phone"
              label="Contact Number"
              autoComplete="phone"
              onInput={handlePhoneInput}
              {...register('phoneNumber')}
              className={`text-field Mui-focused ${errors.phoneNumber ? 'Mui-error' : ''}`}
            />
            {errors?.phoneNumber && (
              <p style={{ color: colors.red[500], margin: '3px' }}>
                {errors.phoneNumber.message}
              </p>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PrimaryDetails;
