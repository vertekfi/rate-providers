// SPDX-License-Identifier: GPL-3.0-or-later
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/IRateProvider.sol";

contract TestChainlinkRateProvider is AccessControl, IRateProvider {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 private _rate;
    // Rate providers are expected to respond with a fixed-point value with 18 decimals
    // We then need to scale the price feed's output to match this.
    uint256 internal immutable _scalingFactor;

    constructor(uint256 startingRate, uint256 decimals) {
        _rate = startingRate;
        // Think Chainlink might return their own decimal thing for some reason. If I'm thinking of the right thing
        _scalingFactor = 10 ** SafeMath.sub(18, decimals());

        _grantRole(role, account);
    }

    /**
     * @return the value of the quote currency in terms of the base currency
     */
    function getRate() external view override returns (uint256) {
        return _rate;
    }

    function setRate(uint256 rate) external onlyRole(ADMIN_ROLE) {
        _rate = rate;
    }
}
