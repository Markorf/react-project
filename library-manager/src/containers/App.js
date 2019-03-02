import React, { Component } from "react";
import Layout from "../hoc/Layout/Layout";
import Home from "./pages/home/Home"
import Edit from "./pages/edit/Edit"
import NewBook from "./pages/new_book/NewBook"
import About from "./pages/about/About"
import { Route, Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/edit" component={Edit} />
          <Route path="/new_book" component={NewBook} />
          <Route path="/about" render={() => <About {...this.props} foo={10} />} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
