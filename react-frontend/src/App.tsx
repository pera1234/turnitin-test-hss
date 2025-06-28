import React from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { Routes, Route, NavLink as CustomLink } from 'react-router-dom';
import Home from './Home';
import Members from './Members';

const App: React.FC = () => {
  return (
      <Container>
        <Nav tabs className="my-3">
          <NavItem>
            <NavLink tag={CustomLink} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={CustomLink} to="/members">Members</NavLink>
          </NavItem>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Container>
  );
};

export default App;