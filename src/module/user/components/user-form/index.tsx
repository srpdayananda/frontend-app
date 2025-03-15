import React from 'react';
import { Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import PrimaryDetails from './primary-details';
import PasswordSection from './password-section';
import { useAppDispatch } from '../../../../core/context/hooks';
import { ISingleUserResponse } from '../../interface/user-response.interface';
import {
  createUserAsync,
  getSingleUserAsync,
  updateUserAsync,
} from '../../slice/user.slice';
import { handleAPIErrorResponse } from '../../../../shared/utils/handle-api-error-response';
import {
  TGetUserInputProps,
  TUserFormValue,
} from '../../types/user-input-props.type';
import { EUserActionMode } from '../../enums/user-action-mode.enum';
import { IHttpResponse } from '../../../../shared/interface/http-response.interface';
import Address from '../../../../shared/components/address';
import './index.scss';
import { IUserDetail } from '../../interface/user-detail.interface';
import { TAddressChangeData } from '../../../../shared/types/address-change-data.type';
import { IAddress } from '../../../../shared/interface/address.interface';
import { buildUserAPIPayload } from '../../helpers/build-user-api-payload';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Contact number is required')
    .matches(
      /^(\+?\d{1,4}[-.\s]?)?((\d{10})|(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}))$/,
      'Enter a valid phone number',
    ),
  password: yup.string(),
  roles: yup.array().required('Role is required').min(1, 'Role is required'),
  pin: yup.string(),
});

const UserForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mode, userId } = useParams<{
    mode: EUserActionMode;
    userId: string | undefined;
  }>();
  const [user, setUser] = React.useState<IUserDetail | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [address, setAddress] = React.useState<IAddress | null>(null);
  const [isValidAddress, setIsValidAddress] = React.useState(false);

  const methods = useForm<TUserFormValue>({
    resolver: yupResolver(schema),
  });

  const goToUsersViewClickHandler = () => navigate('/user');

  const getSingleUser = async (userId: string) => {
    try {
      const reqBody: TGetUserInputProps = { id: userId };

      const response: ISingleUserResponse = await dispatch(
        getSingleUserAsync(reqBody),
      ).unwrap();
      if (response.isSuccess) {
        setUser(response.data);
      }
    } catch (error) {
      const errorResponse = error as unknown as ISingleUserResponse;
      handleAPIErrorResponse(errorResponse);
    }
  };

  const onSubmitHandler: SubmitHandler<TUserFormValue> = async (formData) => {
    setIsSubmitting(true);
    if (
      (!(formData.password || formData.pin) && mode === EUserActionMode.Add) ||
      !isValidAddress
    ) {
      return;
    }
    const fd = buildUserAPIPayload(formData, address, mode!, userId);
    if (mode === EUserActionMode.Add) {
      await createUserApiHandler(fd);
      return;
    }
    await updateUserApiHandler(fd);
  };

  const createUserApiHandler = async (formData: FormData) => {
    try {
      const response: IHttpResponse = await dispatch(
        createUserAsync(formData),
      ).unwrap();
      if (response.isSuccess) {
        setIsSubmitting(false);
        goToUsersViewClickHandler();
        if (response?.message) {
          toast.success(response.message[0]);
        }
      }
    } catch (error) {
      const errorResponse = error as unknown as IHttpResponse;
      handleAPIErrorResponse(errorResponse);
    }
  };

  const updateUserApiHandler = async (formData: FormData) => {
    try {
      const response: IHttpResponse = await dispatch(
        updateUserAsync(formData),
      ).unwrap();
      if (response.isSuccess) {
        setIsSubmitting(false);
        goToUsersViewClickHandler();
        if (response?.message) {
          toast.success(response.message[0]);
        }
      }
    } catch (error) {
      const errorResponse = error as unknown as IHttpResponse;
      handleAPIErrorResponse(errorResponse);
    }
  };

  const resetBtnClickHandler = () => {
    if (mode === EUserActionMode.Add) {
      methods.reset();
    } else if (userId) {
      getSingleUser(userId);
    }
  };

  const addressChangedHandler = (data: TAddressChangeData) => {
    const { isValid, addressData } = data;
    setIsValidAddress(isValid);
    setAddress(isValid ? addressData : null);
  };

  React.useEffect(() => {
    if (userId) {
      getSingleUser(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <div className="main-content-user-form">
          <div className="previous-page-btn" onClick={goToUsersViewClickHandler}>
            <ArrowBackIosNewIcon className="user-form-arrow-back-icon" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {mode === EUserActionMode.Add ? 'Add New User' : 'Edit User'}
            </Typography>
          </div>
          <div className="user-form-content">
            <PrimaryDetails user={user} mode={mode} />
          </div>
          {mode === EUserActionMode.Add && (
            <div className="user-form-content">
              <Typography className="sub-header-user-form">Password</Typography>
              <PasswordSection isSubmitting={isSubmitting} />
            </div>
          )}
          <div className="user-form-content">
            <Address
              address={user?.address}
              isSubmitted={methods.formState.isSubmitted}
              onChange={addressChangedHandler}
            />
          </div>
          <div className="user-form-last-content">
            <Button
              type="button"
              variant="contained"
              className="user-form-cancel-btn"
              onClick={resetBtnClickHandler}
            >
              {mode === EUserActionMode.Add ? 'Cancel' : 'Reset'}
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="user-form-submit-btn"
            >
              {mode === EUserActionMode.Add ? 'Save' : 'Update'}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
  
};

export default UserForm;
