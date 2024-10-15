import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { CREATE_USER } from './graphql/mutations';
import { GET_USERS } from './graphql/queries';
import { USER_ADDED_SUBSCRIPTION, USER_UPDATED_SUBSCRIPTION } from './graphql/subscriptions';

interface User {
  id: string;
  name: string;
  email: string;
  posts?: { title: string }[];
}

interface UserAddedSubscriptionData {
  userAdded: User;
}

interface UserUpdatedSubscriptionData {
  userUpdated: User;
}

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users
  const { loading, error: queryError } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      console.log('Fetched users data:', data);
      setUsers(data.users);
    }
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setSuccessMessage('User created successfully!');
      setUsername('');
      setEmail('');
    },
    onError: (error) => {
      setError(error.message);
    },
    refetchQueries: [{ query: GET_USERS }]
  });

  // Subscribe to user added events
  useSubscription<UserAddedSubscriptionData>(USER_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        console.log('User added subscription data:', subscriptionData.data);
        const newUser = subscriptionData.data.userAdded;
        setUsers(prevUsers => [...prevUsers, newUser]);
      }
    },
    onError: (error) => {
      console.error('Error in user added subscription:', error);
    }
  });

  // Subscribe to user updated events
  useSubscription<UserUpdatedSubscriptionData>(USER_UPDATED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data) {
        console.log('User updated subscription data:', subscriptionData.data);
        const updatedUser = subscriptionData.data.userUpdated;
        setUsers(prevUsers => prevUsers.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        ));
      }
    },
    onError: (error) => {
      console.error('Error in user updated subscription:', error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await createUser({ variables: { input: { name: username, email } } });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (queryError) return <p>Error fetching users: {queryError.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>

      {/* Display list of users */}
      <h2>Users</h2>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Posts:</strong> {user.posts?.map(post => post.title).join(', ') || 'No posts'}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CreateUser;