export const logoImg = {
  small: {
    height: 80,
    width: 80,
  },
  medium: {
    height: 120,
    width: 120,
  },
  large: {
    height: 130,
    width: 130,
  }
};

export const bugBulletPoints = {
  small: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  medium: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  large: {
    width: 40,
    height: 40,
    marginRight: 20
  }
}

const trophyBase = {
  position: 'absolute',
  bottom: 0
}

export const gameEndTrophy = {
  small: {
    ...trophyBase,
    height: 50,
    width: 50
  },
  medium: {
    ...trophyBase,
    height: 56,
    width: 56
  },
  large: {   
    ...trophyBase,
    height: 60,
    width: 60
  }
}