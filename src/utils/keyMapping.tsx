// NEW FILE
export const playerKeyToInputKey = <N extends number = number>(
  playerKey: `player${N}`
): `p${N}Input` => `p${Number(playerKey.replace('player', '')) as N}Input`;
