import React from "react";
import {Router,Route, hashHistory, IndexRoute} from "react-router";
import Main from "../components/Main";
import HomeContainer from "../containers/HomeContainer";
import Help from "../components/Help"


export default (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={HomeContainer}/>
			<Route path="/:help" component={Help}/>
		</Route>
	</Router>
)
// =============
React
