import React, { ChangeEvent, KeyboardEvent } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import UserCard from './user-card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../core/context/hooks';
import { IUserResponse } from '../../interface/user-response.interface';
import { getUsersAsync, getAllUsersAsync } from '../../slice/user.slice';
import { handleAPIErrorResponse } from '../../../../shared/utils/handle-api-error-response';
import { EUserActionMode } from '../../enums/user-action-mode.enum';
import './index.scss';
import { IUserDetail } from '../../interface/user-detail.interface';
import { TPaginationInputProps } from '../../../../shared/types/pagination-input-props.type';

const UsersView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [users, setUsers] = React.useState<IUserDetail[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    //api call
  };

  const goToAddNewUserClickHandler = () => navigate(`${EUserActionMode.Add}`);

  const loadMoreUsers = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const perPage = resolveItemsPerPage();
    const reqBody: TPaginationInputProps = {
      page: page + 1,
      perPage,
    };

    try {
      const response: IUserResponse = await dispatch(
        getUsersAsync(reqBody),
      ).unwrap();
      if (response.isSuccess) {
        const res = response.data;
        const resUsers = res.users as unknown as IUserDetail[];
        if (Array.isArray(res.users)) {
          setUsers((prevUsers) => {
            const existingUserIds = new Set(prevUsers.map((user) => user.id));
            const uniqueUsers = resUsers.filter(
              (user) => !existingUserIds.has(user.id),
            );
            return [...prevUsers, ...uniqueUsers];
          });
          setPage(reqBody.page);
          setHasMore(res.pagination.nextPage !== null);
        }
      }
    } catch (error) {
      const errorResponse = error as unknown as IUserResponse;
      handleAPIErrorResponse(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  const resolveItemsPerPage = () => {
    if (window.innerWidth < 600) {
      return 4;
    }
    if (window.innerWidth < 900) {
      return 8;
    }
    if (window.innerWidth < 1366) {
      return 10;
    }
    return 12;
  };

  //new user api call
  const allUsersApi = async () => {
    console.log('$$$')
    
    try {
      const response: any = await dispatch(
        getAllUsersAsync()
      ).unwrap();
      if (response.isSuccess) {
        const res = response.data;
        const resUsers = res;
        console.log(resUsers, 'RRRR')
      }
    } catch (error) {
      const errorResponse = error as unknown as IUserResponse;
      handleAPIErrorResponse(errorResponse);
    } 
  }

  React.useEffect(() => {
    const updatePerPageAndFetchData = async () => {
      await loadMoreUsers();
    };

    allUsersApi();
    updatePerPageAndFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
      ) {
        if (hasMore && !loading) {
          loadMoreUsers();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading]);

  return (
    <div className="main-content-users-view">
      <div className="header-content">
        <div>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            User Management
          </Typography>
          <Typography className="users-view-description-text">
            Users and their access can be managed here.
          </Typography>
        </div>
        <div className="users-view-sub-header">
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearchClick}>
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className="custom-text-field"
          />
          <Button
            type="button"
            variant="contained"
            className="add-user-btn"
            startIcon={<AddOutlinedIcon />}
            onClick={goToAddNewUserClickHandler}
          >
            Add New User
          </Button>
        </div>
      </div>
      <div className="user-card-content" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {users.map((user, index) => (
          <div key={index} className="user-card-item">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersView;
