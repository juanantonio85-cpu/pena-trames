// Puntuación general
export function calcGeneralPoints(player) {
  const wins = Number(player.wins || 0);
  const draws = Number(player.draws || 0);
  const losses = Number(player.losses || 0);

  return wins * 3 + draws * 2 + losses * 1;
}

// Puntuación goleadora
export function calcGoalPoints(player) {
  return Number(player.goals || 0);
}
