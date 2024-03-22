import styled from 'styled-components';
import { flexCenter, flexColumn } from 'styles/commonStyle';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';

function TodoList({ listName, list, dispatch }) {
  const handleListItemClick = ({ id, text }) => {
    const actionType = listName === 'todo' ? 'MOVE_TODO_TO_DONE' : 'MOVE_DONE_TO_TODO';
    dispatch({ type: actionType, payload: { id, text } });
  };

  const handleDeleteItem = (e, { id, text }) => {
    e.stopPropagation();
    const actionType = listName === 'todo' ? 'REMOVE_TODO' : 'REMOVE_DONE';
    dispatch({ type: actionType, payload: { id, text } });
  };

  return (
    <TodoListWrapper>
      <h2>
        {listName} <span> / {list.length}개</span>
      </h2>
      <TodoListContainer>
        {list.map((li) => (
          <TodoListItem key={li.id} onClick={() => handleListItemClick(li)}>
            {listName == 'todo' ? <FaRegCircle /> : <FaRegCheckCircle />}
            {li.text}
            <FaRegTrashAlt className="trash-icon" onClick={(e) => handleDeleteItem(e, li)} />
          </TodoListItem>
        ))}
      </TodoListContainer>
    </TodoListWrapper>
  );
}

export default TodoList;

const TodoListWrapper = styled.article`
  display: flex;
  width: 20rem;
  height: 40rem;
  padding: 2rem;
  border: 0.1rem solid #6d6afe;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  border-radius: 2rem;

  & {
    font-size: 2rem;
  }
`;

const TodoListContainer = styled.ul`
  ${flexColumn}
  gap: 1rem;
  overflow: auto;
`;

const TodoListItem = styled.li`
  display: flex;
  ${flexCenter}
  gap: 1rem;
  cursor: pointer;
  .trash-icon {
    visibility: hidden;
  }
  &:hover .trash-icon {
    visibility: visible;
  }
`;
