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

// キャラクター同士の相性データ（公式準拠）
// best=★ベストマッチ, good=○相性いい, challenging=▲相性がよくない
const CHAR_COMPATIBILITY = {
  // ボス猫
  'LCRO-FAPE': { level: 'best', description: 'リード＆サポートで最高の相性' },
  'LCRO-FCRE': { level: 'good', description: '強さと可愛さでお互い惹かれ合う' },
  'LCRO-FCPE': { level: 'good', description: '振り回しても楽しめる関係' },
  'LCRO-LCRO': { level: 'challenging', description: '主導権を譲らず衝突しやすい' },
  // 隠れベイビー
  'LCRE-FARE': { level: 'best', description: '甘えたい気持ちを理解してくれる' },
  'LCRE-LCRE': { level: 'good', description: '同じ性質で安心できる関係' },
  'LCRE-FCPE': { level: 'good', description: '一途な姿に心が動かされる' },
  'LCRE-LAPO': { level: 'challenging', description: '個性が強すぎて噛み合いにくい' },
  // 主役体質
  'LCPO-FAPO': { level: 'best', description: '自由を尊重し合える居心地の良さ' },
  'LCPO-FARE': { level: 'good', description: '不安をうまく支えてくれる' },
  'LCPO-LAPE': { level: 'good', description: '一緒に盛り上がれる関係' },
  'LCPO-FCRO': { level: 'challenging', description: '駆け引き合戦で疲れやすい' },
  // ツンデレヤンキー
  'LCPE-FARO': { level: 'best', description: '素を出せて安心できる相性' },
  'LCPE-LARE': { level: 'good', description: '本音を理解し合える関係' },
  'LCPE-LCPE': { level: 'good', description: '喧嘩も多いけど愛情深い' },
  'LCPE-FCPO': { level: 'challenging', description: '盛り上がるが衝突しやすい' },
  // 憧れの先輩
  'LARO-FCPE': { level: 'best', description: '一途さが心地よく安心できる関係' },
  'LARO-FAPO': { level: 'good', description: '気を使わず自然体でいられる' },
  'LARO-FAPE': { level: 'good', description: '優しさを受け止め合える理想の関係' },
  'LARO-LARO': { level: 'challenging', description: '大人すぎて距離が縮みにくい' },
  // カリスマバランサー
  'LARE-FCRE': { level: 'best', description: '甘えを受け止めて支え合える' },
  'LARE-LCPE': { level: 'good', description: '不器用でも本音で向き合える' },
  'LARE-FCPO': { level: 'good', description: '自由さをうまくコントロールできる' },
  'LARE-FARO': { level: 'challenging', description: '奥手すぎてなかなか進展しない' },
  // パーフェクトカメレオン
  'LAPO-FCPO': { level: 'best', description: '熱いアプローチに心を動かされる' },
  'LAPO-FAPE': { level: 'good', description: '自由を理解し合える心地よい関係' },
  'LAPO-LAPO': { level: 'good', description: 'お互いの個性を尊重できる' },
  'LAPO-LCRE': { level: 'challenging', description: '真面目すぎて理解されにくい' },
  // キャプテンライオン
  'LAPE-FCRO': { level: 'best', description: '本音を引き出してくれる相性' },
  'LAPE-LAPE': { level: 'good', description: '信頼感たっぷりで安心できる' },
  'LAPE-LCPO': { level: 'good', description: '自由さを受け止めつつ楽しく過ごせる' },
  'LAPE-FARE': { level: 'challenging', description: 'まとめ役同士で衝突しやすい' },
  // ロマンスマジシャン
  'FCRO-LAPE': { level: 'best', description: '刺激的でワクワクできる関係' },
  'FCRO-FCRO': { level: 'good', description: '価値観が合えば最高の相性' },
  'FCRO-FARE': { level: 'good', description: '一番うまく扱ってくれる相手' },
  'FCRO-LCPO': { level: 'challenging', description: '主役争いでうまくいかない' },
  // ちゃっかりうさぎ
  'FCRE-LARE': { level: 'best', description: '甘えを受け止め安心できる相性' },
  'FCRE-LCRO': { level: 'good', description: '強さと可愛さで惹かれ合う' },
  'FCRE-FCRE': { level: 'good', description: '同じ価値観で居心地が良い' },
  'FCRE-FAPO': { level: 'challenging', description: '気まぐれさに振り回されやすい' },
  // 恋愛モンスター
  'FCPO-LAPO': { level: 'best', description: '自由さに夢中になれる関係' },
  'FCPO-FARO': { level: 'good', description: 'ミステリアスさに惹かれる' },
  'FCPO-LARE': { level: 'good', description: '自由を受け止めて安定できる' },
  'FCPO-LCPE': { level: 'challenging', description: '熱くなる分、衝突も多い' },
  // 忠犬ハチ公
  'FCPE-LARO': { level: 'best', description: '優しく包み込んでくれる理想的な相性' },
  'FCPE-LCRE': { level: 'good', description: '純粋さで自然に惹かれ合う' },
  'FCPE-LCRO': { level: 'good', description: '振り回されても楽しい関係' },
  'FCPE-FCPE': { level: 'challenging', description: '不安が強まりやすい組み合わせ' },
  // 不思議生命体
  'FARO-LCPE': { level: 'best', description: '情熱とゆるさで心地よい相性' },
  'FARO-FCPO': { level: 'good', description: '情熱に惹かれて深まる関係' },
  'FARO-FARO': { level: 'good', description: '個性を尊重し合える心地よさ' },
  'FARO-LARE': { level: 'challenging', description: '慎重すぎてなかなか進展しない' },
  // 敏腕マネージャー
  'FARE-LCRE': { level: 'best', description: '本音を理解して安心できる関係' },
  'FARE-LCPO': { level: 'good', description: '華やかさをサポートし合える' },
  'FARE-FCRO': { level: 'good', description: '駆け引きも楽しめる大人の関係' },
  'FARE-LAPE': { level: 'challenging', description: 'まとめ役同士で衝突しやすい' },
  // デビル天使
  'FAPO-LCPO': { level: 'best', description: '自由を受け止め合える最高の相性' },
  'FAPO-FAPO': { level: 'good', description: '気楽で自然体な関係が続く' },
  'FAPO-LARO': { level: 'good', description: '穏やかで安心できる大人の相性' },
  'FAPO-FCRE': { level: 'challenging', description: '真逆の気質で乱れやすい' },
  // 最後の恋人
  'FAPE-LCRO': { level: 'best', description: '包容力と情熱で理想の関係' },
  'FAPE-LAPO': { level: 'good', description: '予測不能さで刺激をもらえる' },
  'FAPE-LARO': { level: 'good', description: '安心感のある穏やかな関係' },
  'FAPE-FAPE': { level: 'challenging', description: '優しすぎて距離が縮まらない' },
};

const COMPATIBILITY_LABELS = {
  best: { text: '★ ベストマッチ', color: '#FF6B9D' },
  good: { text: '○ 相性いい', color: '#4A90D9' },
  neutral: { text: '― ふつう', color: '#95A5A6' },
  challenging: { text: '▲ 相性がよくない', color: '#E67E22' },
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

function calculateCompatibility(charId1, charId2) {
  // 両方向でチェック
  const key1 = `${charId1}-${charId2}`;
  const key2 = `${charId2}-${charId1}`;
  const result = CHAR_COMPATIBILITY[key1] || CHAR_COMPATIBILITY[key2] || null;

  if (result) {
    return {
      ...result,
      ...COMPATIBILITY_LABELS[result.level],
    };
  }

  // データにない組み合わせ
  return {
    level: 'neutral',
    description: '特別な相性データはありません',
    ...COMPATIBILITY_LABELS['neutral'],
  };
}
