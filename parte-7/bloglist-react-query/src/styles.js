import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f9f9f9;
`;

export const Title = styled.h2`
  color: #0366d6;
`;

export const Paragraph = styled.p`
  padding: 0.5rem 0;
  line-height: 1.6;
  color: #555;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  margin: 0.5rem 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.variant === 'danger' ? '#dc3545' : '#0366d6'};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'danger' ? '#b42a36' : '#024eac'};
  }
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Form = styled.form`
  background-color: white;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const BlogCard = styled.div`
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Comment = styled.li`
  background-color: #f1f1f1;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  list-style: none;
`;

export const CommentListContainer = styled.ul`
  margin-top: 1rem;
  padding: 0;
  border-top: 1px solid #ccc;
`;

export const BlogListContainer = styled.ul`
  padding: 0;
  margin: 1rem 0;
`;

export const BlogListItem = styled.li`
  list-style: none;
  padding: 0.8rem 1rem;
  margin-bottom: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const BlogLink = styled(Link)`
  text-decoration: none;
  color: #0366d6;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid #ccc;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableData = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0366d6;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserContainer = styled.div`
  margin-top: 1.5rem;
`;
