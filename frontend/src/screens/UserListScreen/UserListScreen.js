import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'
import Modal from '../../components/Modal/Modal'
import CustomButton from '../../components/Button/CustomButton'
import CustomTable from '../../components/Table/CustomTable'


const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  const closeModalHandler = () => {
    history.push('/')
  };

  return (
    <>
      <Modal
        show={true}
        onCancel={closeModalHandler}
        footer={<CustomButton to="/">CLOSE</CustomButton>}
      >
        <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <CustomTable>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-lg'>
                          <i aria-hidden="true" className="black edit icon"></i>
                      </Button>
                  </LinkContainer>
                  <Button
                    variant='light'
                    className='btn-lg'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i aria-hidden="true" className="red trash alternate outline icon"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </CustomTable>
      )}
      </Modal> 
    </>
  )
}

export default UserListScreen
