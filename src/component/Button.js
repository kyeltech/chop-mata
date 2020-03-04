import styled from 'styled-components'

export const ButtonContainer =styled.button`
text-transform: capitalize;
font-size: 1.1rem;
border-radius: 4px;
background: transparent;
border: 0.05rem solid var(--mainBlue);
color: var(--mainWhite);
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.4rem 0.2rem 0;
transition: all 0.5s ease-in-out;
&:hover{
    background: var(--mainBlue);
}
&:focus{
    outline:none; 
}
`;

