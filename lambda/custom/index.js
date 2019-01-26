/**

This file is part of Hunt the Yeti.

Hunt the Yeti is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

'use strict';

const Alexa = require('ask-sdk');

const ErrorHandler = require('./handlers/ErrorHandler');
const LocalizationInterceptor = require('./handlers/LocalizationInterceptor');

const LaunchRequest = require('./handlers/LaunchRequest');
const HelpHandler = require('./handlers/HelpHandler');
const BeginGameHandler = require('./handlers/BeginGameHandler');
const RepeatHandler = require('./handlers/RepeatHandler');
const MoveHunterHandler = require('./handlers/MoveHunterHandler');
const ThrowSpearHandler = require('./handlers/ThrowSpearHandler');
const OverviewHandler = require('./handlers/OverviewHandler');
const PauseGameHandler = require('./handlers/PauseGameHandler');
const StopHandler = require('./handlers/StopHandler');

const TableName = 'HuntTheYeti';

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequest,
        HelpHandler,
        BeginGameHandler,
        RepeatHandler,
        MoveHunterHandler,
        ThrowSpearHandler,
        OverviewHandler,
        PauseGameHandler,
        StopHandler, 
        ErrorHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .withTableName(TableName)
    .withAutoCreateTable(true)
    .withSkillId(process.env.APP_ID)
    .lambda();
