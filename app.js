const WaterproofingCostCalculator = () => {
  const [area, setArea] = React.useState('');
  const [buildingType, setBuildingType] = React.useState('');
  const [age, setAge] = React.useState('');
  const [leakage, setLeakage] = React.useState(false);
  const [waterproofingType, setWaterproofingType] = React.useState('');
  const [accessMethod, setAccessMethod] = React.useState('');
  const [requirement, setRequirement] = React.useState('');
  const [cost, setCost] = React.useState(null);

  const calculateCost = () => {
    let baseCost = 0;
    let multiplier = 1;

    // Building type and area
    if (buildingType === 'ベランダ' && area >= 1 && area <= 15) {
      baseCost = 14000;
    } else if (buildingType === '一般住宅' && area >= 16 && area <= 100) {
      baseCost = 10000;
    } else if (buildingType === 'マンション' && area >= 101 && area <= 300) {
      baseCost = 9000;
    } else if (buildingType === '大型マンション' && area > 300) {
      baseCost = 10000;
    }

    // Age of the building
    if (age === '16年～20年' || age === '20年～') {
      multiplier *= 1.3;
    }

    // Leakage
    if (leakage) {
      multiplier *= 1.2;
    }

    // Waterproofing type
    if (waterproofingType === '塩ビシート防水') {
      multiplier *= 1.2;
    }

    // Access method
    if (accessMethod === '上がる手段はない（足場必要）') {
      baseCost += 100000;
    }

    // Requirement
    if (requirement === 'なるべく長く持たせたい') {
      multiplier *= 1.1;
    }

    const totalCost = baseCost * area * multiplier;
    setCost(Math.round(totalCost));
  };

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '20px'}}>
      <h1 style={{textAlign: 'center'}}>防水工事費用計算シミュレーター</h1>
      <div style={{marginBottom: '10px'}}>
        <label>
          屋上の面積 (㎡):
          <input type="number" value={area} onChange={(e) => setArea(e.target.value)} style={{width: '100%'}} />
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          建物タイプ:
          <select onChange={(e) => setBuildingType(e.target.value)} style={{width: '100%'}}>
            <option value="">選択してください</option>
            <option value="ベランダ">ベランダ</option>
            <option value="一般住宅">一般住宅</option>
            <option value="マンション">マンション</option>
            <option value="大型マンション">大型マンション</option>
          </select>
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          築年数:
          <select onChange={(e) => setAge(e.target.value)} style={{width: '100%'}}>
            <option value="">選択してください</option>
            <option value="～10年">～10年</option>
            <option value="11年～15年">11年～15年</option>
            <option value="16年～20年">16年～20年</option>
            <option value="20年～">20年～</option>
          </select>
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          <input type="checkbox" checked={leakage} onChange={(e) => setLeakage(e.target.checked)} />
          雨漏りあり
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          希望する防水タイプ:
          <select onChange={(e) => setWaterproofingType(e.target.value)} style={{width: '100%'}}>
            <option value="">選択してください</option>
            <option value="ウレタン防水">ウレタン防水</option>
            <option value="塩ビシート防水">塩ビシート防水</option>
            <option value="改質アスファルト防水">改質アスファルト防水</option>
            <option value="FRP防水">FRP防水</option>
          </select>
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          屋上へのアクセス方法:
          <select onChange={(e) => setAccessMethod(e.target.value)} style={{width: '100%'}}>
            <option value="">選択してください</option>
            <option value="階段・ハシゴなどで上がることができる">階段・ハシゴなどで上がることができる</option>
            <option value="上がる手段はない（足場必要）">上がる手段はない（足場必要）</option>
          </select>
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          要望:
          <select onChange={(e) => setRequirement(e.target.value)} style={{width: '100%'}}>
            <option value="">選択してください</option>
            <option value="なるべく長く持たせたい">なるべく長く持たせたい</option>
            <option value="なるべく安くおさえたい">なるべく安くおさえたい</option>
          </select>
        </label>
      </div>
      <button onClick={calculateCost} style={{width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>費用を計算</button>
      {cost !== null && (
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <h3>概算費用:</h3>
          <p style={{fontSize: '24px', fontWeight: 'bold'}}>¥{cost.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<WaterproofingCostCalculator />, document.getElementById('root'));
