const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport;
const message = require('uport-transports').message.util;
const { asyncMiddleware } = require('./middlewares/async_middleware');
const {
  fetchProjects,
  fetchProjectModuleData,
  fetchProjectGraphData,
  demoInvestorVotesByProject,
  demoDepositCashflow
} = require('./controllers/projects_controller');
const { fetchTokenHistoryWithEarnings, fetchInvestorBalance, activateDemoInvestorPending, fetchEndTime } = require('./controllers/token_controller');
const { fetchWeiRaised , fetchPurchases, buyTokens } = require('./controllers/crowdsale_controller');
const { voteAndUpdateProjects } = require('./controllers/voting_controller');

const { pitchProject, fetchStartTime } = require('./controllers/project_factory_controller');
const { demoInvestorFreeVotes } = require('./controllers/voting_token_controller');
const { collectDemoInvestorDividend } = require('./controllers/dividends_controller');
const safeStringify = require('json-stringify-safe');

const {
  _projectInstance,
  activationInstance,
  activeTokenInstance,
  crowdsaleInstance,
  dividendsInstance,
  inactiveTokenInstance,
  projectFactoryInstance,
  projectLeaderTrackerInstance,
  votingInstance,
  votingTokenInstance
} = require('./chain_models/models');

const port = process.env.PORT || 8080;

let endpoint = ''
const app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/api/fetchStartAndEndTimes', asyncMiddleware(async (req, res) => {
  const startTime =  await fetchStartTime();
  const endTime =   await fetchEndTime();
  const startAndEndTimes = {startTime, endTime }
  res.send(startAndEndTimes);
}))

app.get('/api/contract_instances', asyncMiddleware( async (req, res) => {
  const eventSubscription = callBack => {
    return async () => {
      return await projectFactoryInstance.events.ProjectPitch({
        filter: {},
        fromBlock: 0
      }, (err, event) => callBack())
    }
  }

  const func = eventSubscription(
    () => {
      console.log('hello')
    }
  )
  const the = await func();
  // console.log(the)
  console.log(eventSubscription)
  res.send(safeStringify({ eventSubscription: eventSubscription }));
}))

app.get('/api/shared_project_graph_data', asyncMiddleware(async (req, res) => {
  const projects = await fetchProjects();
  const weiRaised = await fetchWeiRaised();
  res.send({projects, weiRaised});
}));

app.get('/api/project_graph_data/:address', asyncMiddleware(async (req, res) => {
  const { address } = req.params;
  const project = await fetchProjectGraphData(address);
  res.send(project);
}))

app.get('/api/capital_history_data', asyncMiddleware(async (req, res) => {
  const _capitalHistoryData = await fetchPurchases();
  res.send(_capitalHistoryData)
}));

app.post('/api/token_graph_data', asyncMiddleware(async (req, res) => {
  const { body } = req;
  const { currentViewType, account } = body;
  const _tokenGraphData = await fetchTokenHistoryWithEarnings(currentViewType, account);
  res.send(_tokenGraphData);
}));

app.get('/api/demo/demoInvestorFreeVotes', asyncMiddleware(async (req, res) => {
  const freeVotes = await demoInvestorFreeVotes();
  res.send(freeVotes);
}))

app.get('/api/demo/project_votes/:projectAddress', asyncMiddleware(async (req, res) => {
  const { projectAddress } = req.params;
  const votes = await demoInvestorVotesByProject(projectAddress);
  res.send(votes);
}))

app.post('/api/demo/vote_and_update_projects', asyncMiddleware(async (req, res) => {
  console.log("VOTING")
  const { votes, type, selectedProject } = req.body;
  await voteAndUpdateProjects(votes, type, selectedProject);
  res.send({});
}))

app.post('/api/demo/pitch_project', asyncMiddleware(async (req, res) => {
  const { params } = req.body;
  await pitchProject(params);
  res.send({});
}))

app.post('/api/demo/buy_tokens', asyncMiddleware(async (req, res) => {
  const { wei } = req.body;
  await buyTokens(wei);
  res.send({});
}))

app.get('/api/demo/fetch_investor_balance', asyncMiddleware(async (req, res) => {
  const balance = await fetchInvestorBalance();
  res.send(balance);
}))

app.post('/api/demo/deposit_cashflow', asyncMiddleware(async (req, res) => {
  const { weiAmount, projectAddress } = req.body;
  await demoDepositCashflow(weiAmount, projectAddress);
  res.send({})
}))

app.get('/api/demo/activate_investor_pending', asyncMiddleware(async (req, res) => {
  await activateDemoInvestorPending();
  res.send({})
}))

app.get('/api/demo/collect_investor_dividend', asyncMiddleware(async (req, res) => {
  await collectDemoInvestorDividend();
  res.send({})
}))


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  })
}

const server = app.listen(port, () => {
  console.log("listening on port", port)
})
