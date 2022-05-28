import styled from 'styled-components';

export const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  margin-top: 50px;

  input {
    width: 500px;
    margin-right: 50px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    -webkit-transition: border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
      outline: 3px solid rgba(0, 184, 255, 0.7) !important;
      transition: 0.1s;
    }
  }
`;
export const ButtonStyle = styled.button`
  border: none;
  width: 100px;
  height: 35px;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 0.25rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)) top/100% 800%;
  padding: 0.5rem 0.9rem;
  transition: 0.5s;
  background-color: rgba(25, 135, 84);
  &:hover {
    background-position: bottom;
    transition: 0.4s;
  }
  &:focus {
    outline: 3px solid !important;
    outline-color: rgba(25, 135, 84, 0.5) !important;
    background-position: bottom;
    transition: 0.1s;
  }
`;
