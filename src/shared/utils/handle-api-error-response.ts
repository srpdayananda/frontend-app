import { toast } from 'react-toastify';

import { IHttpResponse } from '../interface/http-response.interface';

export const handleAPIErrorResponse = (error: IHttpResponse) => {
  if (!error?.message) {
    toast.error('An unexpected error occurred');
    return;
  }
  const { message } = error;
  if (Array.isArray(message)) {
    message.forEach((msg: string) => toast.error(msg));
  } else if (typeof message === 'string') {
    toast.error(message);
  }
};
