export const getRemainingTime = (game_levels, level, default_level) =>
  game_levels.find(game_level => game_level.mode === (level || default_level))
    .speed;
