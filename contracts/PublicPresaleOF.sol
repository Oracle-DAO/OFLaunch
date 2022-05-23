// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

interface IERC20 {

    function totalSupply() external view returns (uint256);

    function decimals() external view returns (uint8);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function mint(address to, uint256 amount) external;

    function burn(address to, uint256 amount) external;

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transfer.selector, to, value)
        );
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transferFrom.selector, from, to, value)
        );
    }

    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        bytes memory returndata = address(token).functionCall(
            data,
            'SafeERC20: low-level call failed'
        );
        if (returndata.length > 0) {
            // Return data is optional
            // solhint-disable-next-line max-line-length
            require(
                abi.decode(returndata, (bool)),
                'SafeERC20: ERC20 operation did not succeed'
            );
        }
    }
}

library FullMath {
    function fullMul(uint256 x, uint256 y)
    private
    pure
    returns (uint256 l, uint256 h)
    {
        uint256 mm = mulmod(x, y, type(uint256).max);
        l = x * y;
        h = mm - l;
        if (mm < l) h -= 1;
    }

    function fullDiv(
        uint256 l,
        uint256 h,
        uint256 d
    ) private pure returns (uint256) {
        uint256 pow2 = d & (~d+1);
        d /= pow2;
        l /= pow2;
        l += h * ((~pow2+1) / pow2 + 1);
        uint256 r = 1;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        r *= 2 - d * r;
        return l * r;
    }

    function mulDiv(
        uint256 x,
        uint256 y,
        uint256 d
    ) internal pure returns (uint256) {
        (uint256 l, uint256 h) = fullMul(x, y);
        uint256 mm = mulmod(x, y, d);
        if (mm > l) h -= 1;
        l -= mm;
        require(h < d, 'FullMath::mulDiv: overflow');
        return fullDiv(l, h, d);
    }
}

library LowGasSafeMath {
    /// @notice Returns x + y, reverts if sum overflows uint256
    /// @param x The augend
    /// @param y The addend
    /// @return z The sum of x and y
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x);
    }

    function add32(uint32 x, uint32 y) internal pure returns (uint32 z) {
        require((z = x + y) >= x);
    }

    function max32(uint32 x, uint32 y) internal pure returns (uint32) {
        if(x > y){
            return x;
        }
        return y;
    }

    function min(uint32 x, uint32 y) internal pure returns (uint32) {
        if(x < y){
            return x;
        }
        return y;
    }

    function min(uint256 x, uint256 y) internal pure returns (uint256) {
        if(x < y){
            return x;
        }
        return y;
    }


    /// @notice Returns x - y, reverts if underflows
    /// @param x The minuend
    /// @param y The subtrahend
    /// @return z The difference of x and y
    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x);
    }

    function sub32(uint32 x, uint32 y) internal pure returns (uint32 z) {
        require((z = x - y) <= x);
    }

    /// @notice Returns x * y, reverts if overflows
    /// @param x The multiplicand
    /// @param y The multiplier
    /// @return z The product of x and y
    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(x == 0 || (z = x * y) / x == y);
    }

    function mul32(uint32 x, uint32 y) internal pure returns (uint32 z) {
        require(x == 0 || (z = x * y) / x == y);
    }

    /// @notice Returns x + y, reverts if overflows or underflows
    /// @param x The augend
    /// @param y The addend
    /// @return z The sum of x and y
    function add(int256 x, int256 y) internal pure returns (int256 z) {
        require((z = x + y) >= x == (y >= 0));
    }

    /// @notice Returns x - y, reverts if overflows or underflows
    /// @param x The minuend
    /// @param y The subtrahend
    /// @return z The difference of x and y
    function sub(int256 x, int256 y) internal pure returns (int256 z) {
        require((z = x - y) <= x == (y >= 0));
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, 'SafeMath: division by zero');
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    function sqrrt(uint256 a) internal pure returns (uint256 c) {
        if (a > 3) {
            c = a;
            uint256 b = add(div(a, 2), 1);
            while (b < c) {
                c = b;
                b = div(add(div(a, b), b), 2);
            }
        } else if (a != 0) {
            c = 1;
        }
    }
}

library FixedPoint {
    struct uq112x112 {
        uint224 _x;
    }

    struct uq144x112 {
        uint256 _x;
    }

    uint8 private constant RESOLUTION = 112;
    uint256 private constant Q112 = 0x10000000000000000000000000000;
    uint256 private constant Q224 =
    0x100000000000000000000000000000000000000000000000000000000;
    uint256 private constant LOWER_MASK = 0xffffffffffffffffffffffffffff; // decimal of UQ*x112 (lower 112 bits)

    function decode(uq112x112 memory self) internal pure returns (uint112) {
        return uint112(self._x >> RESOLUTION);
    }

    function decode112with18(uq112x112 memory self)
    internal
    pure
    returns (uint256)
    {
        return uint256(self._x) / 5192296858534827;
    }

    function fraction(uint256 numerator, uint256 denominator)
    internal
    pure
    returns (uq112x112 memory)
    {
        require(denominator > 0, 'FixedPoint::fraction: division by zero');
        if (numerator == 0) return FixedPoint.uq112x112(0);

        if (numerator <= type(uint144).max) {
            uint256 result = (numerator << RESOLUTION) / denominator;
            require(result <= type(uint224).max, 'FixedPoint::fraction: overflow');
            return uq112x112(uint224(result));
        } else {
            uint256 result = FullMath.mulDiv(numerator, Q112, denominator);
            require(result <= type(uint224).max, 'FixedPoint::fraction: overflow');
            return uq112x112(uint224(result));
        }
    }
}

contract PublicPresaleOF {

    using SafeERC20 for IERC20;
    using FixedPoint for *;
    using LowGasSafeMath for uint256;
    using LowGasSafeMath for uint32;

    mapping(address => uint256) public userToTokenAmount;
    uint256 public totalTokenSupply;
    uint256 public totalAmountRaised;
    uint256 public totalAmountToRaise;
    uint256 public price;
    uint32 public totalParticipatedUser;
    uint32 public startTimestamp;
    uint32 public endTimestamp;
    bool public contractStatus;
    uint256 public timeFrame;
    string private salt;

    IERC20 private projectToken;
    IERC20 private principalToken;
    address private _owner;

    modifier onlyCaller() {
        require(_owner == msg.sender, "Owner Invalid");
        _;
    }

    constructor (
        address tokenAdd_,
        address principal_,
        uint256 price_,
        uint256 totalAmountToRaise_,
        uint256 totalTokenSupply_,
        uint32 startTime_,
        uint32 endTime_)
    {
        _owner = msg.sender;
        projectToken = IERC20(tokenAdd_);
        principalToken = IERC20(principal_);
        price = price_;
        totalAmountToRaise = totalAmountToRaise_;
        totalTokenSupply = totalTokenSupply_;
        startTimestamp = startTime_;
        endTimestamp = endTime_;
        contractStatus = true;
    }

    receive() external payable{
    }

    // ============= Owner/Admin Actions =================

    function changeContractStatus(bool status) external onlyCaller {
        contractStatus = status;
    }

    function withdrawRemainingTokens(address to_) external onlyCaller returns(uint256) {
        uint256 balance = projectToken.balanceOf(address(this));
        projectToken.safeTransfer(to_, balance);
        return balance;
    }

    function withdrawRaisedAmount() external onlyCaller returns(uint256) {
        uint256 balance = principalToken.balanceOf(address(this));
        principalToken.safeTransfer(msg.sender, balance);
        return balance;
    }

    function withdrawPartialRaisedAmount(uint256 _amount) external onlyCaller returns(uint256) {
        require(_amount > 0, 'Invalid Amount');
        uint256 balance = principalToken.balanceOf(address(this));
        require(_amount < balance, 'Amount greater than raised amount');
        principalToken.safeTransfer(msg.sender, _amount);
        return balance.sub(_amount);
    }

    function setTimeInfo(uint32 startTime_, uint32 endTime_) external onlyCaller {
        require(startTime_ != 0 || endTime_ != 0, "Both timestamp cannot be 0");
        if(startTime_ != 0){
            startTimestamp = startTime_;
        }
        if(endTime_!= 0){
            endTimestamp = endTime_;
        }
    }

    function setTimeFrame(uint256 _timeFrame) external onlyCaller {
        require(_timeFrame > 0, 'Invalid TimeFrame');
        timeFrame = _timeFrame;
    }

    // ============= User Actions =================

    function setSalt(string memory salt_) external onlyCaller {
        salt = salt_;
    }

    // ============= User Actions =================

    // don't forget to approve the principal token
    function participate(uint256 amount_, string memory salt_) external {
        require(contractStatus, "Sale Contract is Inactive");
        require(keccak256(bytes(salt)) == keccak256(bytes(salt_)), "Only Salt no sugar !!");
        require(amount_ > 0, "invalid amount");
        require(startTimestamp < block.timestamp, "project not live");
        require(endTimestamp > block.timestamp, "project has ended");
        require(totalAmountRaised.add(amount_) <= totalAmountToRaise, "Amount exceeds total amount to raise");

        uint256 value = payoutFor(amount_);
        require(userToTokenAmount[msg.sender].add(value) <= maxAllocation(), "Token amount exceed");
        if(userToTokenAmount[msg.sender] == 0){
            totalParticipatedUser += 1;
        }

        totalAmountRaised += amount_;
        userToTokenAmount[msg.sender] = userToTokenAmount[msg.sender].add(value);
        principalToken.safeTransferFrom(msg.sender, address(this), amount_);
        projectToken.safeTransfer(msg.sender, value);
    }

    function maxAllocation() public view returns(uint256 _token) {
        uint256 timeBlocks = getTimeBlocks();
        _token = (timeBlocks > 20 ? 5000 : 2500 + (125 * timeBlocks))*10**18;
    }

    function getTimeBlocks() public view returns(uint256 _blocks){
        _blocks = uint256(uint32(block.timestamp).sub32(startTimestamp)).div(timeFrame);
    }

    function maxTokensForUser(address _userAddress) public view returns(uint256) {
        require(_userAddress != address(0), 'Invalid Address');
        return maxAllocation().sub(userToTokenAmount[_userAddress]);
    }

    function payoutFor(uint256 amount) internal view returns(uint256){
        return ((FixedPoint.fraction(amount, price).decode112with18()).div(1e15)).mul(1e15);
    }

    function owner() external view returns(address){
        return _owner;
    }

    function getProjectTokenAddress() external view returns(address){
        return address(projectToken);
    }

    function getProjectDetails() external view returns(
        address projectToken_,
        address principalToken_,
        bool contractStatus_
    ){
        principalToken_ = address(principalToken);
        projectToken_ = address(projectToken);
        contractStatus_ = contractStatus;
    }

    function getTokenInfo() external view returns(
        uint256 totalTokenSupply_,
        address projectToken_,
        uint256 tokenPrice_
    ){
        totalTokenSupply_ = totalTokenSupply;
        projectToken_ = address(projectToken);
        tokenPrice_ = price;
    }

    function getAmountInfo() external view returns(
        uint256 totalAmountToRaise_,
        uint256 totalAmountRaised_
    ) {
        totalAmountRaised_ = totalAmountRaised;
        totalAmountToRaise_ = totalAmountToRaise;
    }
}

