// 4つの系統
const STYLES = {
  VD: { id: 'VD', name: '溺愛系', description: '相手に深く密着し、尽くす愛情スタイル', color: '#FF6B9D' },
  VI: { id: 'VI', name: '堅実系', description: '将来志向で安定と信頼を重視', color: '#4A90D9' },
  ND: { id: 'ND', name: '魅惑系', description: '現在の情熱的な深いつながりを求める', color: '#9B59B6' },
  NI: { id: 'NI', name: '自立系', description: '自分のペースを大切にし干渉されない距離を求める', color: '#2ECC71' },
};

// 16キャラクター（公式コード）
const CHARACTERS = [
  { id: 'LCRO', name: 'ボス猫', baseImg: 'https://lovecharacter64.jp/assets/LCRO-Bb_g4ewK.webp' },
  { id: 'LCRE', name: '隠れベイビー', baseImg: 'https://lovecharacter64.jp/assets/LCRE-BvTVmh12.webp' },
  { id: 'LCPO', name: '主役体質', baseImg: 'https://lovecharacter64.jp/assets/LCPO-D7OwBuUB.webp' },
  { id: 'LCPE', name: 'ツンデレヤンキー', baseImg: 'https://lovecharacter64.jp/assets/LCPE-BWY3PkMd.webp' },
  { id: 'LARO', name: '憧れの先輩', baseImg: 'https://lovecharacter64.jp/assets/LARO-BbbJMn7k.webp' },
  { id: 'LARE', name: 'カリスマバランサー', baseImg: 'https://lovecharacter64.jp/assets/LARE-DsBeGZt5.webp' },
  { id: 'LAPO', name: 'パーフェクトカメレオン', baseImg: 'https://lovecharacter64.jp/assets/LAPO-0gFgHz-C.webp' },
  { id: 'LAPE', name: 'キャプテンライオン', baseImg: 'https://lovecharacter64.jp/assets/LAPE-IZGO6e6H.webp' },
  { id: 'FCRO', name: 'ロマンスマジシャン', baseImg: 'https://lovecharacter64.jp/assets/FCRO-SvySFHns.webp' },
  { id: 'FCRE', name: 'ちゃっかりうさぎ', baseImg: 'https://lovecharacter64.jp/assets/FCRE-Cd7poyzw.webp' },
  { id: 'FCPO', name: '恋愛モンスター', baseImg: 'https://lovecharacter64.jp/assets/FCPO-CRp-3gUs.webp' },
  { id: 'FCPE', name: '忠犬ハチ公', baseImg: 'https://lovecharacter64.jp/assets/FCPE-E4kETolf.webp' },
  { id: 'FARO', name: '不思議生命体', baseImg: 'https://lovecharacter64.jp/assets/FARO-C39LX-i-.webp' },
  { id: 'FARE', name: '敏腕マネージャー', baseImg: 'https://lovecharacter64.jp/assets/FARE-Dh2zljKA.webp' },
  { id: 'FAPO', name: 'デビル天使', baseImg: 'https://lovecharacter64.jp/assets/FAPO-DL_y9YnJ.webp' },
  { id: 'FAPE', name: '最後の恋人', baseImg: 'https://lovecharacter64.jp/assets/FAPE-ILprNXrv.webp' },
];

// 64タイプの画像URL（系統別） - 必要に応じて追加可能
const IMAGE_URLS = {};

// 相性計算用データ
const COMPATIBILITY = {
  'VD-VD': { level: 'good', score: 75 },
  'VD-VI': { level: 'best', score: 95 },
  'VD-ND': { level: 'good', score: 75 },
  'VD-NI': { level: 'challenging', score: 40 },
  'VI-VD': { level: 'best', score: 95 },
  'VI-VI': { level: 'good', score: 75 },
  'VI-ND': { level: 'neutral', score: 55 },
  'VI-NI': { level: 'good', score: 75 },
  'ND-VD': { level: 'good', score: 75 },
  'ND-VI': { level: 'neutral', score: 55 },
  'ND-ND': { level: 'best', score: 95 },
  'ND-NI': { level: 'good', score: 75 },
  'NI-VD': { level: 'challenging', score: 40 },
  'NI-VI': { level: 'good', score: 75 },
  'NI-ND': { level: 'good', score: 75 },
  'NI-NI': { level: 'best', score: 95 },
};

const COMPATIBILITY_LABELS = {
  best: { text: '最高', color: '#FF6B9D', description: '最高の相性！お互いを高め合える関係' },
  good: { text: '良好', color: '#4A90D9', description: '良い相性。自然と理解し合える' },
  neutral: { text: '普通', color: '#95A5A6', description: '普通の相性。努力次第で良くなる' },
  challenging: { text: '刺激的', color: '#E67E22', description: '刺激的な相性。違いを楽しめるかがカギ' },
};

// ヘルパー関数
function getCharacter(id) {
  return CHARACTERS.find(c => c.id === id);
}

function getStyle(id) {
  return STYLES[id];
}

function getImageUrl(charId, styleId) {
  const key = `${charId}-${styleId}`;
  // 系統別画像があればそれを使用、なければベース画像を使用
  if (IMAGE_URLS[key]) {
    return IMAGE_URLS[key];
  }
  const char = getCharacter(charId);
  return char ? char.baseImg : null;
}

function getFullTypeName(charId, styleId) {
  const char = getCharacter(charId);
  const style = getStyle(styleId);
  return `${style.name}${char.name}`;
}

function calculateCompatibility(style1, style2) {
  const key = `${style1}-${style2}`;
  const result = COMPATIBILITY[key] || { level: 'neutral', score: 55 };
  return {
    ...result,
    ...COMPATIBILITY_LABELS[result.level],
  };
}
