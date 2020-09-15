const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const data = {
            text: `<div className="Me-picture">
<img src={parv3} alt="me" />
<h2>Patrik Arvius</h2>
</div>
<div className="Me-text">
<h1>Om mig</h1>
<p>Mitt namn är Patrik Arvius. Jag är född och uppvuxen i Stockholm men har stora delar av min släkt
nere på österlen i Skåne och där kommer alltid en bit av mitt hjärta att finnas. För tillfället bor
på södermalm tillsammans med min fru och njuter av tillvaron med henne.
</p>
<p>Jag älskar att laga mat, simma, hålla på med datorer samt lyssna på musik. Främst har datorintressed tidigare
präglats utav just spelens värld men det här med programmering är intressant, som ett digitalt lego. När det kommer till spel
så blir det främst datorspel men jag är även mycket intresserad utav brädspel i alla dess former.
</p>
</div>`
    };

    res.json(data);
});

module.exports = router;
