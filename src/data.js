/* data.js --- source of barrage introduction
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 */

// first write origin document to a md file, then read data using fs.readSync with 'utf-8'
// encoding in node.
// copy result data to src.

export default {
  src: "### Introducation\nBarrage 是一个基于 web 平台的多玩家在线对战弹幕射击游戏。当玩这个游戏的时候，你需要控制一架飞机去击毁其他玩家控制的飞机或者是场上的障碍物。\n\n这个游戏需要你控制自己的飞机来击毁场景上其他玩家的飞机，并且场上会不定时投放物资，玩家可以通过这些物资来强化自己的飞机。\n\n### feature\n- 障碍物：在场地上会有一些障碍物阻碍飞行，玩家可以选择击毁场上的障碍物来扩大可以飞行的区域。\n- 物资：场上会随机投放物资，这些物资给玩家的飞机加各种 BUFF 来强化玩家。\n- 技能：每个飞机有3个技能，重攻击对应鼠标右键、防御对应 E 键以及大招对应 Q 键。\n- 移动：上下左右移动分别对应 WASD 键。\n- 慢速模式：按住 SHIFT 键飞机的移动速度会变慢，可以用来辅助躲避密集的弹幕子弹。\n- 射击：你可以通过移动鼠标来确定攻击的方向，通过鼠标左键或者空格键进行射击。如果想要进行持续的射击，你可以按住鼠标左键或者空格键。"
}


/* data.js ends here */
