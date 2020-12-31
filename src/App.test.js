import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import renderer from 'react-test-renderer'
import StationBody from './stationpage/station-body'
import SignUpNav from './signup/signup-nav'
import SignUpBody from './signup/signup-body'
import LoginBody from './login/login-body'
import LoginNav from './login/login-nav'
import LandingBody from './landing/landing-body'
import LandingNav from './landing/landing-nav'
import Footer from './footer/footer'
import DashboardBody from './dashboard/dashboard-body'
import DashboardNav from './dashboard/dashboard-nav'



describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
  
  it('renders the UI as expected', () => {
    const div = document.createElement('div')
    const tree = renderer
      .create(<BrowserRouter>
        <App />
      </BrowserRouter>,
      div)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });

});

describe("Station Body component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <StationBody />
    , div);
  });
});

describe("Signup Nav component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><SignUpNav /></BrowserRouter>, div);
  });
});

describe("Signup Body component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><SignUpBody /></BrowserRouter>, div);
  });
});

describe("Login Body component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><LoginBody /></BrowserRouter>, div);
  });
});

describe("Login Nav component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><LoginNav /></BrowserRouter>, div);
  });
});

describe("Landing Nav component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><LandingNav /></BrowserRouter>, div);
  });
});

describe("Landing Body component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><LandingBody /></BrowserRouter>, div);
  });
});

describe("Footer component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><Footer /></BrowserRouter>, div);
  });
});

describe("Dashboard Body component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><DashboardBody /></BrowserRouter>, div);
  });
});

describe("Dashboard Nav component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><DashboardNav /></BrowserRouter>, div);
  });
});





