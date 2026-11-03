/* ===== Nội dung chuyên đề: Vocabulary 01 – Environment ===== */
var VOCAB_CONTENT = (function () {
  'use strict';

  /* ---------- Ghi chú từ (bấm vào từ in đậm trong bài đọc) : [từ, phiên âm, loại từ, định nghĩa] ---------- */
  var GLOSS = {
    'in the throes of': ['be in the throes of', '/biː ɪn ðə θrəʊz əv/', 'idiom', 'in the middle of a difficult or painful situation or process'],
    'cataclysmic': ['cataclysmic', '/ˌkætəˈklɪzmɪk/', 'adjective', 'sudden, violent and causing great destruction or change'],
    'precipitate': ['precipitate', '/prɪˈsɪpɪteɪt/', 'verb', 'to make something (usually bad) happen suddenly or sooner than expected'],
    'anthropogenic': ['anthropogenic', '/ˌænθrəpəˈdʒenɪk/', 'adjective', 'caused or produced by human activity'],
    'defaunation': ['defaunation', '/ˌdiːfɔːˈneɪʃn/', 'noun', 'the loss or disappearance of wild animal populations or species from an ecosystem'],
    'precipitous': ['precipitous', '/prɪˈsɪpɪtəs/', 'adjective', '(of a fall or decline) very sudden and great'],
    'circumspect': ['circumspect', '/ˈsɜːkəmspekt/', 'adjective', 'careful and unwilling to take risks or make quick judgements'],
    'inexorable': ['inexorable', '/ɪnˈeksərəbl/', 'adjective', 'impossible to stop or prevent'],
    'encroachment': ['encroachment', '/ɪnˈkrəʊtʃmənt/', 'noun', 'the gradual spread of something onto land or into an area that belongs to something else'],
    'outstrip': ['outstrip', '/ˌaʊtˈstrɪp/', 'verb', 'to become larger, faster or more important than something else'],
    'habitat fragmentation': ['habitat fragmentation', '/ˈhæbɪtæt ˌfræɡmenˈteɪʃn/', 'noun', 'the breaking up of a continuous habitat into smaller, isolated pieces'],
    'edge effects': ['edge effects', '/edʒ ɪˈfekts/', 'noun', 'changes in conditions such as light, wind and dryness at the boundary of a habitat patch'],
    'genetic bottleneck': ['genetic bottleneck', '/dʒəˈnetɪk ˈbɒtlnek/', 'noun', 'a sharp fall in the size of a population that greatly reduces its genetic variety'],
    'succumb to': ['succumb to', '/səˈkʌm tə/', 'phrasal verb', 'to be unable to resist an illness, a pressure or an attack'],
    'inbreeding depression': ['inbreeding depression', '/ˈɪnbriːdɪŋ dɪˈpreʃn/', 'noun', 'reduced health, fertility and survival caused by mating between closely related individuals'],
    'pathogenic': ['pathogenic', '/ˌpæθəˈdʒenɪk/', 'adjective', 'able to cause disease'],
    'overexploitation': ['overexploitation', '/ˌəʊvərˌeksplɔɪˈteɪʃn/', 'noun', 'using a natural resource (e.g. fish or wildlife) faster than it can recover'],
    'illicit': ['illicit', '/ɪˈlɪsɪt/', 'adjective', 'not allowed by law; illegal'],
    'compound': ['compound', '/kəmˈpaʊnd/', 'verb', 'to make a problem or difficult situation worse'],
    'inextricably': ['inextricably', '/ˌɪnɪkˈstrɪkəbli/', 'adverb', 'in a way that cannot be separated'],
    'interdependent': ['interdependent', '/ˌɪntədɪˈpendənt/', 'adjective', 'depending on each other'],
    'keystone species': ['keystone species', '/ˈkiːstəʊn ˈspiːʃiːz/', 'noun', 'a species that many others in an ecosystem depend on, so that its loss changes the whole system'],
    'trophic cascade': ['trophic cascade', '/ˈtrɒfɪk kæˈskeɪd/', 'noun', 'a chain of effects down a food web caused by adding or removing a top predator'],
    'apex predator': ['apex predator', '/ˈeɪpeks ˈpredətə(r)/', 'noun', 'a predator at the top of a food chain that has no natural predators of its own'],
    'extirpate': ['extirpate', '/ˈekstəpeɪt/', 'verb', 'to destroy something completely; (of a species) to wipe it out from a particular area'],
    'proliferate': ['proliferate', '/prəˈlɪfəreɪt/', 'verb', 'to increase rapidly in number or amount'],
    'imperil': ['imperil', '/ɪmˈperəl/', 'verb', 'to put something or somebody in danger'],
    'invaluable': ['invaluable', '/ɪnˈvæljuəbl/', 'adjective', 'extremely useful; so valuable that its worth cannot be measured'],
    'carbon sink': ['carbon sink', '/ˈkɑːbən sɪŋk/', 'noun', 'a forest, ocean or other natural system that absorbs more carbon than it releases'],
    'carbon sequestration': ['carbon sequestration', '/ˈkɑːbən ˌsiːkwəˈstreɪʃn/', 'noun', 'the process of capturing carbon dioxide from the atmosphere and storing it'],
    'tipping point': ['tipping point', '/ˈtɪpɪŋ pɔɪnt/', 'noun', 'the point at which a series of small changes becomes large enough to cause a bigger, often irreversible change'],
    'irreversible': ['irreversible', '/ˌɪrɪˈvɜːsəbl/', 'adjective', 'impossible to change back to a previous condition'],
    'feedback loop': ['feedback loop', '/ˈfiːdbæk luːp/', 'noun', 'a process in which the result of a change causes more of the same change'],
    'picturesque': ['picturesque', '/ˌpɪktʃəˈresk/', 'adjective', 'pretty, especially in a way that looks like a painting'],
    'uninhabitable': ['uninhabitable', '/ˌʌnɪnˈhæbɪtəbl/', 'adjective', 'not fit for people or animals to live in'],
    'disproportionately': ['disproportionately', '/ˌdɪsprəˈpɔːʃənətli/', 'adverb', 'to a degree that is too large (or too small) in comparison with something else'],
    'poverty-ridden': ['poverty-ridden', '/ˈpɒvəti ˌrɪdn/', 'adjective', 'badly affected by poverty; very poor'],
    'bear the brunt': ['bear the brunt of sth', '/beə(r) ðə brʌnt əv/', 'idiom', 'to suffer the worst part of something unpleasant'],
    'conservationist': ['conservationist', '/ˌkɒnsəˈveɪʃənɪst/', 'noun', 'a person who works to protect the natural environment'],
    'tirelessly': ['tirelessly', '/ˈtaɪələsli/', 'adverb', 'with a lot of effort and without stopping'],
    'stem the tide': ['stem the tide (of sth)', '/stem ðə taɪd/', 'idiom', 'to stop something unpleasant from continuing to grow'],
    'anthropocentric': ['anthropocentric', '/ˌænθrəpəˈsentrɪk/', 'adjective', 'regarding humans as the most important thing in the world'],
    'pay lip service to': ['pay lip service to sth', '/peɪ lɪp ˈsɜːvɪs tə/', 'idiom', 'to say that you support something without doing anything to help it'],
    'teeter on the brink of': ['teeter on the brink of sth', '/ˈtiːtə(r) ɒn ðə brɪŋk əv/', 'idiom', 'to be extremely close to a disaster or a very bad situation'],
    'rewilding': ['rewilding', '/ˌriːˈwaɪldɪŋ/', 'noun', 'returning land to its natural state, e.g. by bringing back native plants and animals'],
    'coexist': ['coexist', '/ˌkəʊɪɡˈzɪst/', 'verb', 'to live or exist together, peacefully, at the same time or in the same place'],
    'ubiquitous': ['ubiquitous', '/juːˈbɪkwɪtəs/', 'adjective', 'seeming to be everywhere'],
    'epoch': ['epoch', '/ˈiːpɒk/', 'noun', 'a long period of time in history or in the history of the earth, marked by particular features'],
    'non-biodegradable': ['non-biodegradable', '/ˌnɒn ˌbaɪəʊdɪˈɡreɪdəbl/', 'adjective', 'that cannot be broken down naturally by bacteria'],
    'microplastics': ['microplastics', '/ˈmaɪkrəʊˌplæstɪks/', 'noun', 'very small pieces of plastic, less than 5 mm long'],
    'abyssal': ['abyssal', '/əˈbɪsl/', 'adjective', 'relating to the very deepest parts of the ocean'],
    'airborne': ['airborne', '/ˈeəbɔːn/', 'adjective', 'carried through or floating in the air'],
    'endocrine disruptor': ['endocrine disruptor', '/ˈendəʊkraɪn dɪsˈrʌptə(r)/', 'noun', 'a chemical that interferes with the hormones of the body'],
    'chemical-laden': ['chemical-laden', '/ˈkemɪkl ˌleɪdn/', 'adjective', 'carrying or containing a lot of chemicals'],
    'bioaccumulate': ['bioaccumulate', '/ˌbaɪəʊəˈkjuːmjəleɪt/', 'verb', '(of a substance) to build up in a living organism over time'],
    'biomagnification': ['biomagnification', '/ˌbaɪəʊˌmæɡnɪfɪˈkeɪʃn/', 'noun', 'the increase in the concentration of a toxin at each higher level of a food chain'],
    'malaise': ['malaise', '/məˈleɪz/', 'noun', 'a general problem or feeling that something is wrong in a society or system, with no single clear cause'],
    'consumerism': ['consumerism', '/kənˈsjuːmərɪzəm/', 'noun', 'a way of life in which buying and owning goods is seen as very important'],
    'externalities': ['externality (pl. externalities)', '/ˌekstɜːˈnæləti/', 'noun', 'a cost or benefit that affects people other than those who make or buy something and is not included in its price'],
    'epitomise': ['epitomise', '/ɪˈpɪtəmaɪz/', 'verb', 'to be a perfect example of something'],
    'twofold': ['twofold', '/ˈtuːfəʊld/', 'adjective, adverb', 'twice as much or as many'],
    'planned obsolescence': ['planned obsolescence', '/plænd ˌɒbsəˈlesns/', 'noun', 'the practice of designing products so that they go out of date or stop working quickly'],
    'effluent': ['effluent', '/ˈefluənt/', 'noun', 'liquid waste that flows out of factories or sewage systems'],
    'pollution-ridden': ['pollution-ridden', '/pəˈluːʃn ˌrɪdn/', 'adjective', 'badly affected by pollution'],
    'run-off': ['run-off', '/ˈrʌn ɒf/', 'noun', 'rain water, together with chemicals or soil, that flows off land into rivers and lakes'],
    'eutrophication': ['eutrophication', '/ˌjuːtrəfɪˈkeɪʃn/', 'noun', 'the process in which too many nutrients in water cause algae to grow fast and use up the oxygen'],
    'starve of': ['starve sth of sth', '/stɑːv ... əv/', 'verb phrase', 'to fail to give something what it needs; to deprive it of something'],
    'hypoxic': ['hypoxic', '/haɪˈpɒksɪk/', 'adjective', 'having too little oxygen'],
    'anaerobic': ['anaerobic', '/ˌænəˈrəʊbɪk/', 'adjective', 'living or happening without oxygen'],
    'leachate': ['leachate', '/ˈliːtʃeɪt/', 'noun', 'polluted liquid that drains out of a landfill site'],
    'waterborne': ['waterborne', '/ˈwɔːtəbɔːn/', 'adjective', '(of a disease) spread through water'],
    'salinisation': ['salinisation', '/ˌsælɪnaɪˈzeɪʃn/', 'noun', 'the process by which soil or water becomes too salty'],
    'exacerbate': ['exacerbate', '/ɪɡˈzæsəbeɪt/', 'verb', 'to make a problem or a bad situation worse'],
    'desertification': ['desertification', '/dɪˌzɜːtɪfɪˈkeɪʃn/', 'noun', 'the process by which fertile land turns into desert'],
    'piecemeal': ['piecemeal', '/ˈpiːsmiːl/', 'adjective, adverb', 'done gradually, in separate stages, not as part of a complete plan'],
    'phase out': ['phase sth out', '/feɪz ˈaʊt/', 'phrasal verb', 'to stop using or providing something gradually, in stages'],
    'decarbonise': ['decarbonise', '/ˌdiːˈkɑːbənaɪz/', 'verb', 'to reduce or stop the carbon dioxide emissions of something'],
    'a drop in the ocean': ['a drop in the ocean', '/ə drɒp ɪn ði ˈəʊʃn/', 'idiom', 'an amount that is too small to make any real difference'],
    'carbon offsetting': ['carbon offsetting', '/ˈkɑːbən ˈɒfsetɪŋ/', 'noun', 'reducing carbon emissions in one place (e.g. by planting trees) to make up for emissions produced elsewhere'],
    'greenwashing': ['greenwashing', '/ˈɡriːnwɒʃɪŋ/', 'noun', 'making people believe that a company or product is more environmentally friendly than it really is'],
    'kick the can down the road': ['kick the can down the road', '/kɪk ðə kæn daʊn ðə rəʊd/', 'idiom', 'to delay dealing with a problem instead of solving it now'],
    'curtail': ['curtail', '/kɜːˈteɪl/', 'verb', 'to limit or reduce something'],
    'dystopian': ['dystopian', '/dɪsˈtəʊpiən/', 'adjective', 'relating to an imagined place or future in which everything is extremely bad'],
    'come to pass': ['come to pass', '/kʌm tə pɑːs/', 'idiom', 'to happen'],
    'renewable': ['renewable', '/rɪˈnjuːəbl/', 'adjective', '(of energy) coming from a source that is not used up, such as wind, water or the sun'],
    'circular economy': ['circular economy', '/ˈsɜːkjələ(r) ɪˈkɒnəmi/', 'noun', 'an economic system that keeps products and materials in use through reuse, repair and recycling'],
    'economical': ['economical', '/ˌiːkəˈnɒmɪkl/', 'adjective', 'using money, time or resources carefully, without waste'],
    'rebound effect': ['rebound effect', '/ˈriːbaʊnd ɪˈfekt/', 'noun', 'a situation in which the savings from greater efficiency are reduced because people use more'],
    'stringent': ['stringent', '/ˈstrɪndʒənt/', 'adjective', '(of rules or standards) very strict'],
    'a case in point': ['a case in point', '/ə keɪs ɪn pɔɪnt/', 'idiom', 'a good example of the thing being discussed'],
    'all but': ['all but + adj', '/ɔːl bʌt/', 'phrase', 'almost completely'],
    'tip the balance': ['tip the balance', '/tɪp ðə ˈbæləns/', 'idiom', 'to be the factor that decides the result of a situation'],
    'mitigate': ['mitigate', '/ˈmɪtɪɡeɪt/', 'verb', 'to make something less harmful, serious or painful'],
    'irreparable': ['irreparable', '/ɪˈrepərəbl/', 'adjective', 'too bad or too serious to be repaired or put right']
  };

  /* ---------- Bài đọc (**từ** hoặc **chữ trong bài|khoá ghi chú**) ---------- */
  var R1 = {
    title: 'The Quiet Unravelling of Life on Earth',
    paras: [
      'Scientists have long warned that the planet is **in the throes of** its sixth mass extinction. Unlike the five **cataclysmic** events that preceded it, which were **precipitated|precipitate** by asteroid impacts or volcanic upheaval, this one is overwhelmingly **anthropogenic**. **Defaunation|defaunation** – the **precipitous** loss of wild animals from ecosystems that may otherwise look intact – is proceeding at a pace that has unsettled even the most **circumspect** researchers.',
      'The principal culprit is not hunting but the **inexorable** **encroachment** of agriculture on forests, wetlands and grasslands, as the demand for land has **outstripped|outstrip** every attempt to rein it in. Clearing land does more than shrink the area of pristine wilderness; it causes **habitat fragmentation**, carving ecosystems into isolated patches whose margins suffer from **edge effects** such as desiccation and wind damage. Populations marooned in these “islands” pass through a **genetic bottleneck**: deprived of new mates, they **succumb to** **inbreeding depression** and grow ever more susceptible to **pathogenic** fungi and viruses. **Overexploitation|overexploitation**, notably industrial trawling and the **illicit** wildlife trade, has **compounded|compound** the damage.',
      'Because species are **inextricably** **interdependent**, the disappearance of a single **keystone species** can trigger a **trophic cascade** that reverberates through an entire food web. When **apex predators|apex predator** are **extirpated|extirpate**, herbivore numbers can **proliferate** unchecked, stripping vegetation and accelerating soil erosion. Pollinators offer a further case in point: their decline, hastened by pesticides, **imperils|imperil** a large share of the crops on which humanity depends.',
      'Intact ecosystems also furnish services that are **invaluable** yet seldom priced. Peatlands and old-growth forests act as vast **carbon sinks|carbon sink** through **carbon sequestration**; mangroves buffer coastlines against storm surges; wetlands filter pollutants from water. Push these systems past a **tipping point**, however, and the damage becomes **irreversible**: a drained peatland releases carbon it has locked away for millennia, setting off a **feedback loop** that warms the climate further, while a once **picturesque** valley stripped of its vegetation may become all but **uninhabitable**.',
      'The toll falls **disproportionately** on the poorest communities, often in **poverty-ridden** rural areas, who **bear the brunt** of this loss because their livelihoods hinge directly on nature. **Conservationists|conservationist** have campaigned **tirelessly**, and the resurgence of several whale populations proves that concerted action can **stem the tide**. Yet as long as we cling to an **anthropocentric** worldview and governments merely **pay lip service to** biodiversity targets, ever more species will **teeter on the brink of extinction|teeter on the brink of**. Advocates of **rewilding** argue that learning to **coexist** with the rest of the living world is no longer a matter of choice but of survival.'
    ]
  };
  var R2 = {
    title: 'The True Cost of Convenience',
    paras: [
      'Plastics are now so **ubiquitous** that geologists have proposed them as a marker of a new **epoch**. Most are **non-biodegradable**: rather than decomposing, they fragment into **microplastics** that have been detected in the **abyssal** depths of the oceans, in Arctic sea ice and even in human blood, while **airborne** particles settle on remote mountain peaks. Laced with additives that act as **endocrine disruptors|endocrine disruptor**, these **chemical-laden** particles are ingested by plankton and **bioaccumulate**, becoming ever more concentrated – a process known as **biomagnification** – as they pass up the food chain.',
      'Plastic, however, is merely the most visible symptom of a deeper **malaise**: **consumerism**. The extraction, manufacture and disposal of the goods we buy generate a sizeable share of global greenhouse gas emissions, yet these costs remain **externalities**, borne by society rather than reflected in prices. Fast fashion **epitomises|epitomise** the problem: global clothing production has risen roughly **twofold** since the turn of the century, fuelled by **planned obsolescence** and garments designed to be discarded after a handful of wears. Textile mills, meanwhile, discharge **effluent** laden with dyes into rivers, turning once-pristine waterways into **pollution-ridden** channels.',
      'Intensive agriculture compounds the strain. Fertiliser **run-off** triggers **eutrophication**: excess nutrients fuel algal blooms that **starve|starve of** lakes and coastal waters **of|starve of** oxygen, leaving **hypoxic** “dead zones” in which only **anaerobic** bacteria thrive. Where sewage and **leachate** from landfills seep into drinking supplies, **waterborne** diseases such as cholera follow. Meanwhile, the overdrawing of aquifers and the **salinisation** of irrigated soil have **exacerbated|exacerbate** **desertification** across much of the arid world.',
      'Policymakers have responded, albeit **piecemeal**. Many countries have **phased out|phase out** single-use bags, introduced deposit-return schemes and pledged to **decarbonise** their economies. Critics counter that such measures are **a drop in the ocean**, that **carbon offsetting** too often amounts to little more than **greenwashing**, and that governments prefer to **kick the can down the road** rather than **curtail** economic growth. Without bolder action, they warn, the **dystopian** vision of barren soils and empty seas may yet **come to pass**.',
      'Individuals are far from powerless. Switching to **renewable** energy, repairing rather than replacing, and embracing a **circular economy** are not only greener but frequently more **economical**. Yet experts caution against a **rebound effect**, whereby efficiency gains are cancelled out by increased consumption. Multiplied across millions of households and backed by **stringent** legislation, such choices could nonetheless **tip the balance** and **mitigate** the damage before it becomes **irreparable**.'
    ]
  };

  /* ---------- Bảng từ vựng: [từ, loại, vị trí, nghĩa, collocation/ghi chú, khoá ghi chú, hình] ---------- */
  var VOCAB = [
    { group: 'Sinh thái học', items: [
      ['anthropogenic', 'adj', 'R1:1', 'do con người gây ra', '<i>anthropogenic emissions / climate change</i>', 'anthropogenic'],
      ['defaunation', 'n', 'R1:1', 'sự suy giảm, biến mất động vật hoang dã', 'khác <i>deforestation</i> (mất rừng)', 'defaunation'],
      ['encroachment', 'n', 'R1:2', 'sự lấn chiếm', '<i>encroach on / upon</i> + habitat, land', 'encroachment'],
      ['habitat fragmentation', 'n', 'R1:2', 'chia cắt môi trường sống', '<i>lead to / be driven by habitat fragmentation</i>', 'habitat fragmentation', 'habitat fragmentation'],
      ['edge effects', 'n', 'R1:2', 'hiệu ứng rìa (biến đổi ở mép mảnh rừng)', 'đi với <i>desiccation</i> (sự khô kiệt)', 'edge effects', 'edge effects'],
      ['genetic bottleneck', 'n', 'R1:2', 'nút thắt cổ chai di truyền – quần thể của một loài bị giảm sút đột ngột và mạnh trong một thời gian ngắn', '<i>pass through a genetic bottleneck</i>', 'genetic bottleneck', 'genetic bottleneck'],
      ['inbreeding depression', 'n', 'R1:2', 'suy thoái do giao phối cận huyết', '<i>succumb to inbreeding depression</i>', 'inbreeding depression'],
      ['pathogenic', 'adj', 'R1:2', 'gây bệnh', '<i>pathogenic fungi / bacteria</i>; danh từ <i>pathogen</i>', 'pathogenic'],
      ['keystone species', 'n', 'R1:3', 'loài then chốt', 'mất nó → cả hệ sinh thái sụp đổ', 'keystone species', 'keystone species'],
      ['trophic cascade', 'n', 'R1:3', 'thác dinh dưỡng (hiệu ứng lan truyền theo chuỗi thức ăn)', '<i>trigger a trophic cascade</i>', 'trophic cascade', 'trophic cascade'],
      ['apex predator', 'n', 'R1:3', 'động vật săn mồi đầu bảng', '', 'apex predator', 'apex predator'],
      ['extirpate', 'v', 'R1:3', 'tiêu diệt tận gốc (tuyệt chủng cục bộ)', '<i>extirpation</i> (n)', 'extirpate'],
      ['carbon sink / carbon sequestration', 'n', 'R1:4', 'bể chứa carbon / thu giữ carbon', '<i>act as a carbon sink</i>', 'carbon sink', 'carbon sink'],
      ['tipping point / feedback loop', 'n', 'R1:4', 'điểm tới hạn / vòng phản hồi', '<i>push past a tipping point</i>; <i>set off a feedback loop</i>', 'tipping point', 'tipping point'],
      ['rewilding', 'n', 'R1:5', 'tái hoang dã hoá', '<i>rewilding projects</i>', 'rewilding']
    ] },
    { group: 'Ô nhiễm và khoa học môi trường', items: [
      ['abyssal', 'adj', 'R2:1', 'thuộc vực thẳm biển sâu', '<i>abyssal depths / plains</i>', 'abyssal', 'abyssal'],
      ['endocrine disruptor', 'n', 'R2:1', 'chất gây rối loạn nội tiết', '', 'endocrine disruptor', 'endocrine disruptor'],
      ['bioaccumulate / biomagnification', 'v / n', 'R2:1', 'tích luỹ sinh học / khuếch đại sinh học qua chuỗi thức ăn', '', 'biomagnification', 'biomagnification'],
      ['effluent', 'n', 'R2:2', 'nước thải công nghiệp', '<i>discharge effluent into</i>', 'effluent', 'effluent'],
      ['run-off', 'n', 'R2:3', 'dòng chảy tràn (mang phân bón, hoá chất)', '<i>fertiliser / agricultural run-off</i>', 'run-off', 'run-off'],
      ['hypoxic / anaerobic', 'adj', 'R2:3', 'thiếu oxy / yếm khí', '<i>hypoxic dead zones</i>; <i>anaerobic bacteria</i>', 'hypoxic', 'hypoxic'],
      ['leachate', 'n', 'R2:3', 'nước rỉ rác', '<i>leachate from landfills</i>; động từ <i>leach</i>', 'leachate', 'leachate'],
      ['salinisation', 'n', 'R2:3', 'nhiễm mặn', '<i>soil salinisation</i>', 'salinisation', 'salinisation']
    ] },
    { group: 'Kinh tế – chính sách', items: [
      ['externalities', 'n', 'R2:2', 'ngoại ứng (chi phí xã hội không phản ánh vào giá)', '<i>negative externalities</i>', 'externalities'],
      ['planned obsolescence', 'n', 'R2:2', 'lỗi thời có chủ đích', 'hậu tố <i>-escence</i>', 'planned obsolescence', 'planned obsolescence'],
      ['carbon offsetting', 'n', 'R2:4', 'bù trừ carbon', '<i>offset emissions</i>', 'carbon offsetting', 'carbon offsetting'],
      ['greenwashing', 'n', 'R2:4', '"tẩy xanh" – quảng cáo xanh giả tạo', '', 'greenwashing', 'greenwashing'],
      ['circular economy', 'n', 'R2:5', 'kinh tế tuần hoàn', '≠ <i>linear economy</i>', 'circular economy', 'circular economy'],
      ['rebound effect', 'n', 'R2:5', 'hiệu ứng dội ngược (tiết kiệm năng lượng → tiêu dùng nhiều hơn)', '', 'rebound effect', 'rebound effect']
    ] },
    { group: 'Từ học thuật C1–C2', items: [
      ['cataclysmic / precipitous', 'adj', 'R1:1', 'thảm khốc / dốc đứng, đột ngột', '<i>a precipitous decline</i>', 'precipitous', 'precipitous'],
      ['precipitate', 'v', 'R1:1', 'gây ra (đột ngột)', '<i>precipitate a crisis</i>', 'precipitate'],
      ['circumspect', 'adj', 'R1:1', 'thận trọng', '', 'circumspect'],
      ['inexorable', 'adj', 'R1:2', 'không thể ngăn cản', '<i>the inexorable rise of</i>', 'inexorable', 'inexorable'],
      ['illicit', 'adj', 'R1:2', 'bất hợp pháp', '≠ <i>elicit</i> (gợi ra)', 'illicit'],
      ['compound / exacerbate', 'v', 'R1:2', 'làm trầm trọng thêm', '<i>compound the problem</i> (T1 [2], T2 [3])', 'compound'],
      ['inextricably', 'adv', 'R1:3', 'không thể tách rời', '<i>inextricably linked / interdependent</i>', 'inextricably'],
      ['proliferate', 'v', 'R1:3', 'sinh sôi nảy nở nhanh', '<i>proliferation</i> (n)', 'proliferate', 'proliferate'],
      ['imperil', 'v', 'R1:3', 'đặt vào vòng nguy hiểm', '= <i>jeopardize, endanger</i>', 'imperil'],
      ['disproportionately', 'adv', 'R1:5', 'một cách không cân xứng', '<i>be disproportionately affected</i>', 'disproportionately'],
      ['ubiquitous', 'adj', 'R2:1', 'có mặt khắp nơi', '<i>ubiquity</i> (n)', 'ubiquitous', 'ubiquitous'],
      ['malaise', 'n', 'R2:2', 'căn bệnh (xã hội), sự trì trệ', '<i>a deeper / economic malaise</i>', 'malaise'],
      ['epitomise', 'v', 'R2:2', 'là hình mẫu tiêu biểu của', '<i>the epitome of</i>', 'epitomise'],
      ['piecemeal', 'adj / adv', 'R2:4', 'chắp vá, từng phần', '<i>a piecemeal approach</i>', 'piecemeal'],
      ['curtail', 'v', 'R2:4', 'cắt giảm, hạn chế', '<i>curtail growth / spending</i>', 'curtail'],
      ['stringent', 'adj', 'R2:5', 'nghiêm ngặt', '<i>stringent regulations</i>', 'stringent']
    ] }
  ];
  var IDIOMS = [
    ['be in the throes of', 'R1:1', 'đang ở giữa (giai đoạn khủng hoảng)', 'in the throes of'],
    ['succumb to', 'R1:2', 'không chống chọi nổi', 'succumb to'],
    ['a case in point', 'R1:3', 'một ví dụ điển hình', 'a case in point'],
    ['all but + adj', 'R1:4', 'gần như hoàn toàn (<i>all but uninhabitable</i>)', 'all but'],
    ['bear the brunt of', 'R1:5', 'hứng chịu hậu quả nặng nhất', 'bear the brunt', 'bear the brunt of'],
    ['stem the tide (of)', 'R1:5', 'ngăn chặn làn sóng', 'stem the tide', 'stem the tide'],
    ['pay lip service to', 'R1:5', 'nói suông, ủng hộ ngoài miệng', 'pay lip service to'],
    ['teeter on the brink of', 'R1:5', 'chênh vênh bên bờ vực', 'teeter on the brink of', 'teeter on the brink of'],
    ['starve sth of sth', 'R2:3', 'làm cạn kiệt', 'starve of'],
    ['a drop in the ocean', 'R2:4', 'muối bỏ bể', 'a drop in the ocean', 'a drop in the ocean'],
    ['kick the can down the road', 'R2:4', 'trì hoãn giải quyết vấn đề', 'kick the can down the road', 'kick the can down the road'],
    ['come to pass', 'R2:4', 'xảy ra, thành hiện thực', 'come to pass'],
    ['tip the balance', 'R2:5', 'làm thay đổi cán cân', 'tip the balance', 'tip the balance']
  ];

  /* ---------- Bài tập ---------- */
  var QC = [
    'Governments that merely pay {qc1a} service to climate targets will never stem the {qc1b} of emissions.',
    'Remove a keystone species and you may trigger a trophic {qc2}.',
    'Small, isolated populations often succumb {qc3} inbreeding depression.',
    'Toxins become more concentrated up the food chain, a process called bio{qc4}.',
    'Rather than act now, many politicians prefer to kick the {qc5} down the road.'
  ];
  var WF = [
    ['An {} worldview treats nature merely as a resource for humans.', 'CENTRE'],
    ['Microplastics are now so {} that they have been found in Antarctic snow.', 'UBIQUITY'],
    ['Many {} villages lack access to clean water and sanitation.', 'POVERTY'],
    ['Mosquito-{} diseases such as dengue are spreading as temperatures rise.', 'BEAR'],
    ['The {} decline in insect numbers has alarmed entomologists.', 'PRECIPICE'],
    ['Fast fashion is the very {} of a throwaway culture.', 'EPITOMISE'],
    ['The rapid {} of invasive species has pushed several native birds to extinction.', 'PROLIFIC'],
    ['Once a forest is cleared and the topsoil washed away, the damage is often {}.', 'REPAIR'],
    ['Low-lying coastal communities are {} affected by rising sea levels.', 'PROPORTION'],
    ['Phones built to last only two years are a textbook case of planned {}.', 'OBSOLETE'],
    ['Excessive irrigation has raised the {} of the soil, rendering it infertile.', 'SALINE'],
    ['Over the past decade, sales of electric cars have increased {}.', 'THREE'],
    ['The new emission rules are far more {} than the previous ones.', 'STRINGENCY'],
    ['Some fungi are highly {} to amphibians, wiping out entire populations.', 'PATHOLOGY'],
    ['Wolves were {} from much of Western Europe by the 19th century.', 'EXTIRPATION'],
    ['Novels depicting a {} future of barren land are no longer pure fantasy.', 'UTOPIA'],
    ['Bacteria that can survive in oxygen-free water are described as {}.', 'AEROBIC'],
    ['The volunteers’ expertise has proved {}; the project could not have succeeded without them.', 'VALUE'],
    ['Most people are not hostile to environmental causes; they are simply {}.', 'INTEREST'],
    ['Without {} action, the decline may soon become irreversible.', 'CONCERT']
  ];
  var WB_BOX = ['circumspect', 'inexorable', 'illicit', 'compound', 'inextricably', 'imperil', 'ubiquitous', 'malaise', 'piecemeal', 'curtail', 'stringent', 'cataclysmic', 'precipitate', 'proliferate'];
  var WB = [
    'The {} trade in pangolin scales is worth millions of dollars a year.',
    'A single large volcanic eruption can {} a global cooling event lasting several years.',
    'Human health and the environment are {} linked: polluted air shortens millions of lives.',
    'Rising sea temperatures {} coral reefs that support a quarter of all marine species.',
    'Critics argue that the city’s {} approach – a bike lane here, a tree there – will never solve its traffic problem.',
    'The drought was {} by poor water management, leaving farmers with nothing to harvest.',
    'Smartphones have become so {} that few teenagers can imagine life without them.',
    'Factories that fail to meet the new, more {} emission standards will face heavy fines.',
    'After mass protests, the government was forced to {} its spending on coal subsidies.',
    'Scientists are usually {} in their predictions, so their sudden alarm should worry us all.',
    'With no natural predators, rabbits {} across Australia, devastating native vegetation.',
    'Many economists see youth unemployment as a symptom of a broader economic {}.'
  ];
  var MC = [
    ['Despite years of campaigning, conservationists have failed to ___ the tide of deforestation in the region.', ['stop', 'stem', 'turn', 'block']],
    ['Coastal fishing communities have borne the ___ of the oil spill.', ['weight', 'burden', 'brunt', 'force']],
    ['The minister was accused of paying ___ service to renewable energy while approving new coal plants.', ['mouth', 'lip', 'word', 'tongue']],
    ['Planting a few trees in the city centre is a drop in the ___ compared with the scale of deforestation.', ['sea', 'lake', 'river', 'ocean']],
    ['The region is still in the ___ of a severe water crisis.', ['throws', 'throes', 'thrills', 'threats']],
    ['Several amphibian species are now teetering on the ___ of extinction.', ['brink', 'border', 'limit', 'boundary']],
    ['Rather than tackling plastic waste now, the government has decided to kick the ___ down the road.', ['ball', 'can', 'stone', 'bottle']],
    ['Pollinators are a case in ___: their decline threatens global food security.', ['fact', 'example', 'point', 'matter']],
    ['After the forest was cleared, the valley became all ___ uninhabitable.', ['but', 'except', 'too', 'over']],
    ['Fertiliser run-off can ___ rivers of oxygen, killing almost all the fish.', ['starve', 'lack', 'lose', 'run out']],
    ['A small shift in public opinion could tip the ___ in favour of stricter climate laws.', ['balance', 'weight', 'level', 'measure']],
    ['Few people believed that the scientists’ gloomy predictions would ever come to ___.', ['pass', 'light', 'mind', 'end']]
  ];
  var MN = [
    ['Nothing seems able to halt the [inexorable] rise in global temperatures.', ['unstoppable', 'gradual', 'unexpected', 'temporary']],
    ['Microplastics are now [ubiquitous] in the marine environment.', ['rare', 'invisible', 'omnipresent', 'harmless']],
    ['Widespread pesticide use [imperils] bees and other pollinators.', ['protects', 'attracts', 'endangers', 'feeds']],
    ['The village’s tree-planting scheme [epitomises] community-led conservation.', ['undermines', 'exemplifies', 'replaces', 'questions']],
    ['Illegal logging has [compounded] the damage caused by forest fires.', ['repaired', 'created', 'aggravated', 'revealed']],
    ['Even the most [circumspect] researchers now admit the situation is critical.', ['cautious', 'optimistic', 'indifferent', 'confused']],
    ['The EU has introduced [stringent] rules on single-use plastics.', ['strict', 'lax', 'complex', 'costly']],
    ['Once wolves disappear, deer numbers tend to [proliferate].', ['multiply', 'stabilise', 'dwindle', 'migrate']],
    ['Policymakers have tackled the problem [piecemeal].', ['gradually', 'comprehensively', 'reluctantly', 'quickly']],
    ['Scientists fear the damage to the reef may be [irreversible].', ['permanent', 'remediable', 'severe', 'visible']],
    ['Few governments are willing to [curtail] economic growth for the sake of the climate.', ['restrict', 'measure', 'expand', 'predict']],
    ['The survey recorded a [precipitous] decline in butterfly numbers.', ['steep', 'sudden', 'gradual', 'serious']]
  ];
  var CQ = [
    'According to Text 1, why is the current extinction crisis different from earlier ones?',
    'Explain how habitat fragmentation threatens a species’ survival. (Text 1, [2])',
    'What is the link between fertilisers and “dead zones”? (Text 2, [3])',
    'What criticism is made of government measures in Text 2, [4]? Do you agree?'
  ];

  /* ---------- dựng HTML ---------- */
  var hid = 0;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function bold(text) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, function (_, inner) {
      var p = inner.split('|'), shown = p[0], key = (p[1] || p[0]).toLowerCase();
      return '<b class="vw" data-g="' + esc(key) + '" tabindex="0" role="button">' + shown + '</b>';
    });
  }
  function hl(cls, html, tag) { tag = tag || 'div'; return '<' + tag + ' class="hl ' + (cls || '') + '">' + html + '</' + tag + '>'; }
  function passage(R, rid) {
    return '<h2 class="rtitle hl">' + esc(R.title) + '</h2>' + R.paras.map(function (p, i) {
      return '<div class="rpara" id="' + rid + '-p' + (i + 1) + '"><span class="pno">' + (i + 1) + '</span>' + hl('', bold(p), 'p') + '</div>';
    }).join('');
  }
  function head(sec, title, instr) {
    return '<div class="vhead"><div class="vmeta"><span class="vrange">' + sec + '</span></div><h2 class="vtitle">' + title + '</h2>' + (instr ? '<p class="vinstr hl">' + instr + '</p>' : '') + '</div>';
  }
  function gap(id, cls) { return '<input class="gap ' + (cls || '') + '" data-q="' + id + '" id="q-' + id + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="' + id + '">'; }
  function choices(id, opts) {
    return '<div class="choices c4">' + opts.map(function (o, i) {
      var L = 'ABCD'[i];
      return '<label class="ch"><input type="radio" name="' + id + '" data-q="' + id + '" value="' + L + '"><span class="cl">' + L + '</span><span class="ct">' + esc(o) + '</span></label>';
    }).join('') + '</div>';
  }
  function qcard(id, n, body, extra) {
    return '<div class="qc" id="q' + id + '" data-item="' + id + '"><div class="qrow"><span class="qnum">' + n + '</span><div class="qtext">' + body + '</div>' + (extra || '') + '</div></div>';
  }

  function readingView(R, rid, sec, short) {
    var qs = R.paras.map(function (_, i) {
      var id = (rid === 'R1' ? 'h1_' : 'h2_') + (i + 1);
      return '<div class="qc head" id="q' + id + '" data-item="' + id + '">' +
        '<div class="qrow"><span class="qnum">' + (i + 1) + '</span><div class="qtext"><span class="hl">Heading for paragraph [' + (i + 1) + ']</span> <button type="button" class="btn link golink" data-goto="' + rid + ':' + (i + 1) + '">xem đoạn</button></div></div>' +
        '<div class="hrow"><textarea class="rwin" rows="1" data-q="' + id + '" id="q-' + id + '" placeholder="Viết heading của bạn…" spellcheck="false"></textarea>' +
        '<button type="button" class="btn small ghost chk1" data-chk="' + id + '">Kiểm tra</button></div>' +
        '<div class="fb" data-fb="' + id + '"></div></div>';
    }).join('');
    return '<section class="view split" data-sec="' + sec + '">' +
      '<div class="pane pane-read"><div class="inner"><span class="rlabel">Reading passage ' + rid.slice(1) + '</span>' +
      '<div class="reading">' + passage(R, rid) + '</div></div></div>' +
      '<div class="pane pane-q"><div class="inner">' + head(short, 'Come up with a heading for each paragraph',
        'Viết heading cho từng đoạn, bấm <b>Kiểm tra</b> để xem gợi ý heading hợp lý và các ý chính heading nên có. Bấm vào <b>từ in đậm</b> trong bài để xem ghi chú từ.') +
      '<div class="qlist">' + qs + '</div></div></div></section>';
  }

  function compView() {
    var qs = CQ.map(function (q, i) {
      var id = 'cq' + (i + 1);
      return '<div class="qc" id="q' + id + '" data-item="' + id + '"><div class="qrow"><span class="qnum">' + (i + 1) + '</span><div class="qtext hl">' + esc(q) + '</div></div>' +
        '<div class="hrow"><textarea class="rwin tall" rows="3" data-q="' + id + '" id="q-' + id + '" placeholder="Trả lời bằng tiếng Anh…"></textarea></div>' +
        '<div class="fb" data-fb="' + id + '"></div></div>';
    }).join('');
    return '<section class="view split" data-sec="CQ">' +
      '<div class="pane pane-read"><div class="inner"><div class="ptabs"><button type="button" class="ptab active" data-pt="1">Text 1</button><button type="button" class="ptab" data-pt="2">Text 2</button></div>' +
      '<div class="reading pt" data-pt="1">' + passage(R1, 'C1') + '</div><div class="reading pt" data-pt="2" hidden>' + passage(R2, 'C2') + '</div></div></div>' +
      '<div class="pane pane-q"><div class="inner">' + head('Đọc hiểu', 'Comprehension check', 'Trả lời bằng câu của bạn rồi bấm <b>Kiểm tra bài này</b> để so với câu trả lời gợi ý.') +
      '<div class="qlist">' + qs + '</div></div></div></section>';
  }

  /* nghĩa ngắn cho trò nối từ (khi nghĩa đầy đủ quá dài) */
  var SHORT_VI = {
    'genetic bottleneck': 'nút thắt cổ chai di truyền',
    'edge effects': 'hiệu ứng rìa',
    'trophic cascade': 'thác dinh dưỡng',
    'extirpate': 'tiêu diệt tận gốc',
    'run-off': 'dòng chảy tràn',
    'externalities': 'ngoại ứng',
    'greenwashing': '"tẩy xanh"',
    'rebound effect': 'hiệu ứng dội ngược',
    'all but + adj': 'gần như hoàn toàn'
  };
  function plain(s) { return String(s).replace(/<[^>]+>/g, ''); }
  function shortVi(word, vi) { return SHORT_VI[word] || plain(vi).replace(/\s*\(.*\)\s*$/, '').trim(); }
  var SETS = [];
  VOCAB.forEach(function (g) {
    SETS.push({ name: g.group, items: g.items.map(function (it) { var gl = it[5] && GLOSS[it[5]]; return { en: it[0], pos: it[1], at: it[2], vi: it[3], col: it[4], ipa: gl ? gl[1] : '', art: it[6] ? VOCAB_ART[it[6]] : '' }; }) });
  });
  SETS.push({ name: 'Collocation và idiom', items: IDIOMS.map(function (x) { var gl = x[3] && GLOSS[x[3]]; return { en: x[0], pos: gl ? gl[2] : 'phrase', at: x[1], vi: x[2], col: '', ipa: gl ? gl[1] : '', art: x[4] ? VOCAB_ART[x[4]] : '' }; }) });
  SETS.forEach(function (s) { s.pairs = s.items.map(function (it) { return { en: it.en, vi: shortVi(it.en, it.vi), art: it.art }; }); });

  function vocabView() {
    function card(it) {
      var pos = it.at.split(':');
      return '<div class="fcard' + (it.art ? ' has-art' : '') + '" tabindex="0" role="button" aria-label="' + esc(it.en) + ' – bấm để lật">' +
        '<div class="fin"><div class="ff front">' + (it.art ? '<div class="fart">' + it.art + '</div>' : '') +
        '<div class="fword">' + esc(it.en) + '</div>' + (it.ipa ? '<div class="fipa">' + esc(it.ipa) + '</div>' : '') +
        '<div class="fpos">' + esc(it.pos) + '</div><span class="fhint">Bấm để lật</span></div>' +
        '<div class="ff back"><div class="fvi">' + it.vi + '</div>' + (it.col ? '<div class="fcol">' + it.col + '</div>' : '') +
        '<span class="fen">' + esc(it.en) + '</span><button type="button" class="vat golink" data-goto="' + it.at + '">T' + pos[0].slice(1) + ' [' + pos[1] + ']</button></div></div></div>';
    }
    var h = head('Từ vựng', 'Vocabulary from the texts', 'Học từng set: <b>bấm vào thẻ để lật</b> (mặt trước: tiếng Anh, phiên âm; mặt sau: nghĩa tiếng Việt). Học xong chơi <b>Nối từ</b> ở cuối set: chọn một từ tiếng Anh rồi chọn nghĩa đúng, đúng thì cặp đó biến mất.');
    h += '<div class="vsets">' + SETS.map(function (s, k) { return '<button type="button" class="vset-tab' + (k ? '' : ' active') + '" data-set="' + k + '"><b>Set ' + (k + 1) + '</b><span>' + esc(s.name) + ' · ' + s.items.length + ' từ</span></button>'; }).join('') + '</div>';
    h += SETS.map(function (s, k) {
      return '<div class="vset" data-set="' + k + '"' + (k ? ' hidden' : '') + '>' +
        '<div class="vset-head"><h3 class="sub">Set ' + (k + 1) + ' – ' + esc(s.name) + '</h3><div class="vset-btns"><button type="button" class="btn small ghost flipall" data-set="' + k + '">Lật hết</button><button type="button" class="btn small ghost unflip" data-set="' + k + '">Úp hết</button></div></div>' +
        '<div class="fgrid">' + s.items.map(card).join('') + '</div>' +
        '<div class="mgame" data-set="' + k + '"></div></div>';
    }).join('');
    return '<section class="view single" data-sec="VOC"><div class="pane"><div class="inner wide">' + h + '</div></div></section>';
  }
  function singleView(sec, short, title, instr, body) {
    return '<section class="view single" data-sec="' + sec + '"><div class="pane"><div class="inner">' + head(short, title, instr) + body + '</div></div></section>';
  }
  function fillGaps(s, ids) { var i = 0; return esc(s).replace(/\{(\w*)\}/g, function (_, id) { return gap(id || ids[i++]); }); }

  var html = '';
  html += readingView(R1, 'R1', 'R1', 'Bài đọc 1');
  html += readingView(R2, 'R2', 'R2', 'Bài đọc 2');
  html += compView();
  html += vocabView();
  html += singleView('QC', 'Quick check', 'Quick check', 'Không nhìn lại bài đọc, điền <b>một từ</b> vào mỗi chỗ trống. Sau đó bấm <b>Kiểm tra bài này</b>.',
    '<div class="qlist">' + QC.map(function (s, i) { return qcard('qc' + (i + 1), i + 1, '<span class="hl">' + fillGaps(s) + '</span>'); }).join('') + '</div>');
  html += singleView('WF', 'Bài 1', '1. Give the correct form of the word in brackets.', '',
    '<div class="qlist">' + WF.map(function (x, i) { var id = 'wf' + (i + 1); return qcard(id, i + 1, '<span class="hl">' + fillGaps(x[0], [id]) + '</span>', '<span class="kw">' + x[1] + '</span>'); }).join('') + '</div>');
  html += singleView('WB', 'Bài 2', '2. Complete the sentences with words from the box.', 'Change the form if necessary. There are <b>TWO</b> extra words. <span class="muted">(Bấm vào một từ trong khung để gạch đi.)</span>',
    '<div class="wordbank">' + WB_BOX.map(function (w) { return '<button type="button" class="w">' + w + '</button>'; }).join('') + '</div>' +
    '<div class="qlist">' + WB.map(function (s, i) { var id = 'wb' + (i + 1); return qcard(id, i + 1, '<span class="hl">' + fillGaps(s, [id]) + '</span>'); }).join('') + '</div>');
  html += singleView('MC', 'Bài 3', '3. Choose the word or phrase (A, B, C or D) that best completes each sentence.', '',
    '<div class="qlist">' + MC.map(function (x, i) { var id = 'mc' + (i + 1); return '<div class="qc" id="q' + id + '" data-item="' + id + '"><div class="qrow"><span class="qnum">' + (i + 1) + '</span><div class="qtext hl">' + esc(x[0]).replace('___', '<span class="blank"></span>') + '</div></div>' + choices(id, x[1]) + '</div>'; }).join('') + '</div>');
  html += singleView('MN', 'Bài 4', '4. Closest and opposite meaning', '',
    '<div class="qlist">' + MN.map(function (x, i) {
      var id = 'mn' + (i + 1), sub = i === 0 ? '<h3 class="sub">a. Choose the word CLOSEST in meaning to the underlined word.</h3>' : i === 6 ? '<h3 class="sub">b. Choose the word OPPOSITE in meaning to the underlined word.</h3>' : '';
      return sub + '<div class="qc" id="q' + id + '" data-item="' + id + '"><div class="qrow"><span class="qnum">' + (i + 1) + '</span><div class="qtext hl">' + esc(x[0]).replace(/\[(.+?)\]/, '<u class="ul">$1</u>') + '</div></div>' + choices(id, x[1]) + '</div>';
    }).join('') + '</div>');
  html += singleView('KW', 'Bài 5', '5. Complete the second sentence so that it has a similar meaning to the first, using the word given.', 'Do not change the word given. Use between <b>TWO</b> and <b>FIVE</b> words. Chỉ gõ phần còn thiếu.',
    '<div class="qlist">' + VOCAB_CORE.SECTIONS.filter(function (s) { return s.id === 'KW'; })[0].ids.map(function (id, i) {
      var m = VOCAB_CORE.META[id];
      return '<div class="qc rw" id="q' + id + '" data-item="' + id + '"><div class="qrow"><span class="qnum">' + (i + 1) + '</span><div class="qtext orig hl">' + esc(m.prompt) + '</div><span class="kw">' + m.word + '</span></div>' +
        '<div class="rwline"><span class="pre">→ ' + esc(m.prefix) + '</span><textarea class="rwin" rows="1" data-q="' + id + '" id="q-' + id + '" spellcheck="false"></textarea><span class="suf">' + esc(m.suffix) + '</span></div></div>';
    }).join('') + '</div>');

  return { html: html, GLOSS: GLOSS, SETS: SETS };
})();
