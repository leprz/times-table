export interface CoinsSinceLastRewardCalculator {
  calculateAchievedPointsSinceLastReward(highestReward: number): number;
}

export interface PointsToNextPrizeCalculator {
  calculatePointsToNextPrize(highestReward: number): number | null;
}