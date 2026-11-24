# Computational / Operations-Research Methods for Optimizing Hospital Layouts to Minimize Staff (Nurse) Travel

> Research note on access: In this session WebSearch worked, but WebFetch was blocked for almost every primary host (link.springer.com, arxiv.org, research.tudelft.nl, healthdesign.org, mdpi.com, autodesk.com, pubmed.ncbi.nlm.nih.gov, journal.hep.com.cn). The findings below therefore rest on search-result abstracts and summaries from bibliographic pages (Springer, RePEc/IDEAS, EconBiz, IAOR, PMC, CHD summaries). I could not check these against full texts. Quantitative claims I could not source are listed under "Gaps", not stated as fact. Items marked "(unverified, from background knowledge)" are leads for the report writer to confirm, not findings.

## 1. How is the problem formulated (QAP / FLP / graph / TSP-VRP / nurse-patient assignment)?

### Takeaway
Since Elshafei (1977), the standard formulation for hospital department/ward layout has been the Quadratic Assignment Problem (QAP): flows (patient, staff or material trips) × distances, summed over assignments of units to locations. Later work extends it hierarchically (Helber et al. 2016), over multiple periods (Arnolds & Nickel 2013), with geodesic (walkable-path) distances, and with clinical-pathway-mined flows. At the nursing-unit scale, the problem is usually framed as patient-to-room and nurse-to-patient assignment, or as routing (TSP/Hamiltonian cycle). Physical layout rarely enters as the decision variable there.

### Cited Findings
- **Elshafei (1977)**, "Hospital Layout as a Quadratic Assignment Problem," *Journal of the Operational Research Society* 28:167–179, DOI 10.1057/jors.1977.29. It frames the location of hospital departments to minimize patient travel distance as a QAP. — [Springer PDF record](https://link.springer.com/content/pdf/10.1057%2Fjors.1977.29.pdf)
- The Elshafei instance has 19 facilities and became a benchmark ("19 facility problem of Elshafei (1977)") in QAP branch-and-bound literature. It appears in QAPLIB as els19. — [QAP survey, Lehigh](https://coral.ise.lehigh.edu/wp-content/uploads/2014/07/QAP_Survey_04.pdf); [DTIC report](https://apps.dtic.mil/sti/pdfs/ADA112858.pdf)
- A 2025 review describes Elshafei's 1977 paper as "groundbreaking", after which "the QAP framework was reinvented and extended to healthcare layout planning." — [Growing Science, 2025](https://www.growingscience.com/he/Vol1/he_2025_16.pdf)
- **Hahn & Krarup (2001)**, "A hospital facility layout problem finally solved," *Journal of Intelligent Manufacturing* 12:487–496 (DOI 10.1023/A:1012252420779). It solves the 30-facility / 30-location Koopmans–Beckmann QAP that arose in 1972 in designing Klinikum Regensburg (German university hospital), known as **Krarup30a** in QAPLIB. Stützle's 1999 fitness-distance analysis had found 256 global optima. Hahn & Krarup's branch-and-bound proved these optimal, and confirmed 133 of the 256 directly. — [IAOR abstract](https://iaorifors.com/paper/51772); [library record](https://bvbvf1.bib-bvb.de/vufind/PrimoRecord/cdi_proquest_miscellaneous_21464496)
- Anstreicher's 2003 survey notes that long-open QAPs, including Krarup (1972), were solved to optimality for the first time around then. — [Math Programming, DOI 10.1007/s10107-003-0437-z](https://www.doi.org/10.1007/S10107-003-0437-Z)
- **Helber, Böhme, Oucherif, Lagershausen & Kasper (2016)**, "A hierarchical facility layout planning approach for large and complex hospitals," *Flexible Services and Manufacturing Journal* 28:5–29, DOI 10.1007/s10696-015-9214-6. It uses data from Hannover Medical School and proposes locations for departments and wards in a given system of buildings "such that the consumption of resources due to those transportation processes is minimized." Keywords: hospital layout planning, QAP, fix-and-optimize heuristic. — [Springer](https://link.springer.com/article/10.1007/s10696-015-9214-6); [IDEAS/RePEc DP-527](https://ideas.repec.org/p/han/dpaper/dp-527.html); [EconBiz](https://www.econbiz.de/Record/a-hierarchical-facility-layout-planning-approach-for-large-and-complex-hospitals-helber-stefan/10010784202)
- **Arnolds & Nickel (2013)**, "Multi-period layout planning for hospital wards," *Socio-Economic Planning Sciences* 47:220–237. Keywords: discrete optimization, multi-period ward layout planning, different-sized bed rooms. — [EconBiz](https://econbiz.de/Record/multi-period-layout-planning-for-hospital-wards-arnolds-ines-verena/10009792022)
- **Arnolds & Nickel (2015)**, "Layout Planning Problems in Health Care," a chapter in *Applications of Location Analysis* (Springer ISOR), DOI 10.1007/978-3-319-20282-2_5. — [IDEAS](https://ideas.repec.org/h/spr/isochp/978-3-319-20282-2_5.html)
- **Arnolds & Gartner (2018)**, "Improving hospital layout planning through clinical pathway mining," *Annals of Operations Research* 263(1):453–477. Flow matrices are derived from mined clinical pathways rather than estimates. — [Unpaywall DOI 10.1007/s10479-018-2799-x](https://unpaywall.org/10.1007%2FS10479-018-2799-X)
- A TU Delft paper formulates hospital renovation as a **QAP with geodesic distances**, i.e. distances along the actual walkable network rather than rectilinear or Euclidean ones. — [TU Delft repository](https://repository.tudelft.nl/record/uuid:2d1d3c0f-18ae-42a0-a379-e698f5586400)
- A 2025 arXiv paper ("Graph-Theoretic Measures for Interpretable Multicriteria Decision Making in Emergency Department Layout Optimization", arXiv:2504.11620) states that a hospital FLP is "the arrangement of hospital units in certain locations to satisfy design requirements and optimize some objectives" and "can be simplified and formulated as a QAP." It adds graph-theoretic measures for interpretable multi-criteria choice. — [arXiv](https://arxiv.org/pdf/2504.11620)
- **Nurse–patient / patient–room assignment:** a 2024 *OR Spectrum* paper (DOI 10.1007/s00291-024-00800-z) presents what it calls the first integrated model for patient-to-room and nurse-to-patient assignment. Its rationale is that the two decisions jointly determine nurse walking distances. Walking distance is treated as a workload driver, with the nearest nursing station as a reference location. — [Springer](https://link.springer.com/article/10.1007/s00291-024-00800-z)
- **Nurse routing as TSP:** Cattafi et al. (ICLP 2012 technical communications, Dagstuhl LIPIcs) propose a constraint for the shortest Hamiltonian cycle through a subset of nodes, applied to nurse routing. They note that greedy assignments leave routes unoptimized. — [Univ. Ferrara IRIS PDF](https://iris.unife.it/retrieve/e309ade0-39a4-3969-e053-3a05fe0a2c94/ICLP12-DagstuhlProceedings.pdf)
- A Southampton evidence brief links nurse routing to the TSP and VRP. It treats home-health-care routing with time windows and skill constraints as the common extension, and observes that open-source routing tools are rarely ready to use out of the box. — [Southampton ePrints](https://eprints.soton.ac.uk/447454/1/EvidenceBriefs_EPrints.pdf)
- A *Service Science* (2025) surgical-ward workload-balancing model treats travel distance as a non-nursing burden. — [INFORMS supplement](https://pubsonline.informs.org/doi/suppl/10.1287/serv.2025.0138/suppl_file/serv.2025.0138.sm1.pdf)
- **Reviews:** Halawa, Madathil, Gittler & Khasawneh (2020), "Advancing evidence-based healthcare facility design: a systematic literature review," *Health Care Management Science* 23(3), DOI 10.1007/s10729-020-09506-4. It reviews 65 studies (2008–2018) on facility layout and planning across EBD, healthcare systems engineering and OR/OM, and calls for integrating OR/MS methods into EBD. — [IDEAS](https://ideas.repec.org/a/kap/hcarem/v23y2020i3d10.1007_s10729-020-09506-4.html). Jamali, Leung & Verderber (2020), *Frontiers of Architectural Research* 9(3), give a critical review of hospital layout modelling techniques that frames the problem as an FLP. — [DOAJ](https://doaj.org/article/9523bd7934114639a95c1598961fea79). Jia, Nourian, Luscuere & Wagenaar (2023), review of spatial decision support systems for hospital layout design, *Journal of Building Engineering*, DOI 10.1016/j.jobe.2023.106042. It covers ABM, DES, Markov-chain random walks and space syntax. — [TU Delft repository](https://repository.tudelft.nl/file/File_407cd776-fb5b-4d74-b2b5-bf9c8fef3db2)
- Vos, Groothuis & van Merode (2007) published on evaluating hospital design (simulation-based) in *Health Care Management Science*. — cited in search result for [Helber et al.](https://link.springer.com/article/10.1007/s10696-015-9214-6)

### Inferences
- Formulations scale with the design level. Department/ward placement across buildings uses QAP or hierarchical QAP. Room assignment within a ward uses MIP assignment models. Daily operations use nurse–patient assignment or routing. A design project needs the first two. The third mostly supplies flow weights and checks robustness.
- The QAP objective is only as good as its flow matrix. Pathway mining (Arnolds & Gartner) and geodesic distances (TU Delft) are the two main upgrades for realism.
- Because the QAP is NP-hard, exact solution is limited to roughly 30 units (Krarup30a needed specialized branch-and-bound). Realistic hospitals therefore rely on decomposition (Helber's hierarchy) or heuristics.

### Gaps
- I could not access the Elshafei (1977) full text to confirm the reported reduction in patient travel or the exact setting. (Unverified, from background knowledge: a Cairo hospital outpatient setting with ~19 clinics/departments and a roughly 19% travel reduction versus the existing layout. Verify before use.)
- Butler, Karwan, Sweigart et al. (multi-service hospital layout, *Socio-Economic Planning Sciences*/EJOR ~1992) did not surface in searches. Its citation and results are unverified.
- Quantitative improvements for Helber et al. 2016 and Arnolds & Nickel 2013 could not be retrieved (Springer and Elsevier full texts were blocked).

## 2. Which metaheuristics / exact methods are used, and what improvements are reported?

### Takeaway
Exact branch-and-bound has solved the hospital QAP benchmarks (els19, Krarup30a). Practical hospital work uses MIP plus decomposition (fix-and-optimize), simulation-optimization loops, and population metaheuristics (GA, PSO), and recently deep reinforcement learning. Reported improvements are rarely comparable across studies, and I could verify few hard percentages.

### Cited Findings
- Exact: branch-and-bound proved optimality for Krarup30a (30 departments, Klinikum Regensburg) and confirmed Stützle's 256 global optima. — [IAOR](https://iaorifors.com/paper/51772)
- Matheuristic: Helber et al. (2016) use a MIP/QAP with a **fix-and-optimize** heuristic for large hospitals (Hannover Medical School). — [IDEAS](https://ideas.repec.org/p/han/dpaper/dp-527.html)
- Simulation-optimization: Arnolds & Nickel's Winter Simulation Conference 2012 poster describes **robust optimization via simulation**. A mathematical model first assigns departments to rooms from deterministic data. A loop of discrete-event simulation and improvement heuristics then follows, to handle uncertain patient flows. They built a generic DES model adaptable to layouts with a fixed number of floors and rooms, and also evaluate fairness for different patient types. — [WSC 2012 poster](https://www.informs-sim.org/wsc12papers/includes/files/pos183.pdf); [CHOIR talk, Nickel](https://www.utwente.nl/en/choir/events/ArchiveSymposia/CHOIR-practice/20131122_Nickel.pdf)
- PSO + BIM: a 2024 *Buildings* paper (vol. 14, art. 2354) uses particle swarm optimization to generate 2D hospital layouts and then build 3D BIM models. It cites prior work that used **deep reinforcement learning** on BIM data to minimize patient walking distances and maximize space utilization. — [MDPI PDF](https://mdpi-res.com/d_attachment/buildings/buildings-14-02354/article_deploy/buildings-14-02354-v2.pdf?version=1722416004)
- MIP generative workflow: a TU Delft study proposes mixed-integer programming for hospital room placement and corridor generation. — [TU Delft repository](https://repository.tudelft.nl/file/File_0dd30a3c-7fd2-4f54-b60a-980ae1a21847?preview=1)
- Graph-theoretic enumeration: a Penn State study generates many near-optimal department layouts, scores them with a distance-weighted adjacency metric, and links them to BIM authoring tools. Expert scores aligned well with the metric. — [Penn State Pure](https://pure.psu.edu/en/publications/implementation-and-evaluation-of-generative-layout-options-using-/)

### Inferences
- For a design project, a practical stack is: (a) a QAP/MIP with a commercial solver for ≤30–40 units, or (b) a GA, simulated annealing or tabu search for larger or irregular problems. Then validate the shortlist with simulation, as in the Arnolds & Nickel loop.
- Percentage gains reported in QAP papers compare against the existing or a manual layout, so they mostly measure how bad the baseline was. They are not portable across projects.

### Gaps
- No verified quantitative improvement figures for GA, SA or tabu applications to hospitals came back from accessible sources. Classic tabu/SA/GA results on els19 and Kra30a exist in QAPLIB, but I could not fetch them.
- No verified results for DRL hospital layout. The original paper cited by the 2024 *Buildings* article was not identified.

## 3. Discrete-event and agent-based simulation of nurse workflows for comparing layouts

### Takeaway
Simulation, mostly agent-based, is the main tool for comparing nursing-unit layouts. Its best-documented result is about a 15% reduction in simulated nurse walking when layouts were modified per design findings (Lee et al. 2020). Empirical studies show that nurse station placement and path characteristics matter more than overall unit shape. Walking burdens are large: about 2.4–3.4 miles per 10-hour day shift (Hendrich et al. 2008).

### Cited Findings
- **Baseline burden:** Hendrich, Chow, Skierczynski & Lu (2008), "A 36-Hospital Time and Motion Study: How Do Medical-Surgical Nurses Spend Their Time?," *The Permanente Journal* 12(3). It covers 36 med-surg units in 17 health systems across 15 states. The PMC abstract states that distance findings were excluded from that article because of complications in data analysis. — [PMC3037121](https://pmc.ncbi.nlm.nih.gov/articles/PMC3037121)
- Secondary reporting attributes to the same study 2.4–3.4 miles of walking per 10-hour day shift and 1.3–3.3 miles per 10-hour night shift (up to ~4 miles on a 12-hour shift). These figures were not verified in the primary paper. — [Healthcare Design Magazine, "Designing smart"](https://healthcaredesignmagazine.com/?p=1944)
- Earlier: "How far do nurses walk?" (Welton, Decker, Adam & Zone-Smith, *Nursing Economics* 2006). — [PubMed 16999182](https://pubmed.ncbi.nlm.nih.gov/16999182/)
- A three-shift study of nurses' steps and distance traveled exists in PMC (2022). — [PMC9548108](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9548108/)
- **Lee, Lee & Shepley (2020)**, agent-based simulation of 8 common Korean med-surg unit layouts with 33 walking routes, summarized in a Center for Health Design (CHD) KPS. When layouts were modified to incorporate its three design findings, simulated nurse walking distance fell by **15%**. Limitations: a single scenario, and no patient acuity or nurse experience. — [CHD KPS PDF](https://healthdesign.org/sites/default/files/article-pdfs/Lee-2020-CHD-KPS.pdf); [Univ. of Seoul Pure record "The effect of hospital unit layout on nurse walking behavior"](https://pure.uos.ac.kr/en/publications/the-effect-of-hospital-unit-layout-on-nurse-walking-behavior/)
- **Yi & Seo (2012)**, *HERD* 6(1), observational study of medication-administration paths. The smaller radial layout of the east wing had longer path lengths and more deviations than the west wing. The authors concluded that overall unit shape or layout type "might not be a good predictor of nurses' walking behavior." — [CHD KPS PDF](https://www.healthdesign.org/system/files/Yi_Seo-2012-CHD-KPS.pdf)
- **Hendrich, Chow, Bafna, Choudhary, Heo & Skierczynski (2009)**, *HERD* 2(2): spatial properties of nurse assignments had a predictable impact on nurse movement patterns. The simulation model was offered as a planning tool. — [CHD KPS PDF](https://www.healthdesign.org/sites/default/files/article-pdfs/Hendrich-2009-CHD-KPS.pdf)
- **Decentralized nursing unit (HERD 2015**, Fay, Cai & Real et al., "An empirical examination of the impacts of decentralized nursing unit design"). In a before/after study of three units, walking distance increased significantly on two of three units after the move to decentralized stations. — [PubMed 25816381](https://pubmed.ncbi.nlm.nih.gov/25816381/)
- **Hadi & Zimring**, Georgia Tech dissertation: an agent-based simulation of care providers' spatiotemporal experience, calibrated on observations from a pediatric cardiac ICU. — [Georgia Tech repository](https://repository.gatech.edu/entities/publication/cf54e731-f5fc-48a6-83e6-4668f4978848)
- **Yuan & Zhou (2025)**, *Frontiers of Architectural Research*: agent-based simulation combined with social network analysis to assess visibility among healthcare staff in inpatient units. "Multi-ring + branching" corridor shapes showed the highest visibility. — [FoAR 10.1016/j.foar.2024.07.007](https://journal.hep.com.cn/foar/EN/10.1016/j.foar.2024.07.007)
- "Interaction of nursing efficiency and spatial design in different departments: An agent-based modeling approach," *Frontiers of Architectural Research* (2025), DOI 10.1016/j.foar.2025.04.001. — [FoAR](https://journal.hep.com.cn/foar/EN/10.1016/j.foar.2025.04.001)
- A Tehran ward study found that arranging spaces to shorten the most frequent journeys can reduce nurse walking time. — [PubMed 29902936](https://www.pubmed.gov/29902936/)
- Generic DES for layout evaluation: Arnolds & Nickel's adaptable DES model. — [WSC 2012](https://www.informs-sim.org/wsc12papers/includes/files/pos183.pdf). Vos et al. (2007, *HCMS*) on simulation-based hospital design evaluation. — cited via [Springer](https://link.springer.com/article/10.1007/s10696-015-9214-6)

### Inferences
- Unit shape alone (radial vs racetrack vs single corridor) is a weak predictor of walking. Station location, supply/med-room placement relative to rooms, and nurse assignment patterns dominate. Simulation should therefore model task-level trips (med room, clean/soiled utility, supply, station, patient rooms) with assignment rules, not just geometry.
- Decentralization can increase walking (Fay et al. 2015) if supplies and meds remain centralized. Supply distribution must be co-designed with station distribution.

### Gaps
- I could not verify the commonly cited Seo, Choi & Lee (2011) / Seo & Yi simulation figures, or Pati et al. results, with accessible sources.
- I found no accessible primary source naming specific tools (AnyLogic, Simio, MedModel) with quantitative layout comparisons. Treat tool choice as practice knowledge.
- Cai & Zimring did not surface as an agent-based nurse-travel study. The closest result is Cai & Zimring (2012), "Out of sight, out of reach," a space-syntax study of ICU nurse station typology and communication/co-awareness (Space Syntax Symposium). — [Frontiers of Architectural Research ref list via search](https://doaj.org/article/c285423bbb824bb6895fc7af38221a51)

## 4. Space syntax / visibility graph analysis for nursing units

### Takeaway
Space syntax (axial integration, step depth, isovists, VGA) and "targeted visibility" metrics quantify supervision and co-awareness. Generic visibility metrics measured from the nurse station mis-predict real staff behaviour. Lu & Zimring's targeted visibility index (TVI), which counts only views of patient beds, correlates better with where staff actually position themselves.

### Cited Findings
- Lu & Zimring (CHD 2010 summary): the **Targeted Visibility Index (TVI)** measures how much an observer can see all patient beds. Applied to single-corridor, double-corridor and radial units, the radial unit scored highest. Standard visibility analyses were "not applicable to nursing stations" because not all visible points matter equally. — [CHD KPS Lu 2010](https://healthdesign.org/system/files/Lu-2010-CHD-KPS.pdf)
- Lu, Peponis & Zimring (2009) found staff can view patient beds while doing other tasks, from positions not necessarily at the central station. In a neuro ICU, staff density correlated more strongly with targeted-visibility centrality than with generic centrality. — [ACSA Fall 2016 proceedings](https://www.acsa-arch.org/proceedings/Fall%20Conference%20Proceedings/ACSA.FALL.16/ACSA.FALL.16.24.pdf)
- Pachilova & Sailer (2020), *Journal of Architecture*, "Providing care quality by design": radial layout enabled increased visual supervision of patients from the station. The comparison covered only one alternative layout. — [UCL Discovery PDF](https://discovery.ucl.ac.uk/10097438/1/Pachilova_Sailer_2020_ProvidingCareQualitybyDesign_JOA_published.pdf)
- Univ. of Minnesota: application of space syntax theory to medical-surgical nursing units. — [UMN Experts](https://experts.umn.edu/en/publications/application-of-space-syntax-theory-in-the-study-of-medical-surgic-2/)
- Cornell: a new visibility tool to improve nursing unit design. — [Cornell Chronicle](https://news.cornell.edu/index%2Ephp/node/277658)
- 2025 *Buildings* (Cardiff) paper: space-syntax metrics computed inside Revit–Dynamo for emergency department layouts (step depth, metric distance, visibility, connectivity, integration, isovist area), evaluated from both patient and nurse perspectives. — [Cardiff ORCA PDF](https://orca.cardiff.ac.uk/id/eprint/181849/1/buildings-15-03818-v4.pdf)
- A review notes that patient safety through visibility is "more complex than clear lines of sight from the nursing station to the patient." — [PMC4287700](https://pmc.ncbi.nlm.nih.gov/articles/PMC4287700)

### Inferences
- Visibility metrics are naturally a second objective or constraint alongside walking distance. Radial units score well on visibility but can lose on walking (Yi & Seo 2012). This is the core trade-off for multi-objective formulations.

### Gaps
- Exact correlation coefficients for the TVI and staff-density studies were not retrievable.

## 5. Trade-offs: why shortest walking alone is the wrong objective

### Takeaway
Minimizing walking is one objective among several that conflict with it: visibility/supervision, daylight and room-on-perimeter requirements, noise, infection control (single rooms, hand-wash sinks), privacy, staff isolation in decentralized designs, and cost and code. Published evidence shows that walking-centric changes (e.g., decentralization) can backfire or trade off against communication.

### Cited Findings
- Decentralized stations (aimed at proximity to patients) increased walking on 2 of 3 units in a before/after HERD study. — [PubMed 25816381](https://pubmed.ncbi.nlm.nih.gov/25816381/)
- Cai & Zimring (2012), "Out of sight, out of reach," links nurse station typology to nurses' communication and co-awareness, i.e. the staff-isolation side of decentralization. — [DOAJ/FoAR citation context](https://doaj.org/article/c285423bbb824bb6895fc7af38221a51)
- Yi & Seo (2012): the compact radial wing produced longer paths, so compactness of shape ≠ short paths. — [CHD KPS](https://www.healthdesign.org/system/files/Yi_Seo-2012-CHD-KPS.pdf)
- Jia et al. (2023) review frames layout decision support as multi-criteria, combining ABM, DES, random walks and space syntax, and notes that nurses spend more time walking than other caregivers. — [TU Delft PDF](https://repository.tudelft.nl/file/File_407cd776-fb5b-4d74-b2b5-bf9c8fef3db2)
- The 2025 arXiv ED paper uses graph-theoretic measures for interpretable multi-criteria decisions, beyond the single QAP travel objective. — [arXiv 2504.11620](https://arxiv.org/pdf/2504.11620)
- Arnolds & Nickel evaluate fairness across patient types and robustness under uncertain flows, not just mean travel. — [WSC 2012](https://www.informs-sim.org/wsc12papers/includes/files/pos183.pdf)
- An Autodesk University generative-design hospital pharmacy project reported difficulties from an over-constrained site. — [Autodesk University 2020](https://www.autodesk.com/autodesk-university/article/Generative-Design-Complex-Buildings-Optimizing-Spaces-and-Flows-Dynamo-and-Refinery-2020)

### Inferences
- A defensible objective is multi-objective: weighted nurse travel (task-frequency × geodesic distance), plus targeted visibility of beds, plus constraints for daylight/exterior wall per patient room, infection-control zoning (clean/soiled separation, isolation rooms), acoustic separation, and code minima. Pareto fronts or weighted sums with sensitivity analysis are the norm.
- FGI *Guidelines for Design and Construction of Hospitals* (US) set many of these constraints (e.g., single-patient rooms in new construction, windows in patient rooms, hand-washing station locations, clearances). (Unverified in this session; confirm specific clauses against the current FGI edition, 2022 or the 2026 cycle.)

### Gaps
- No accessible source quantified the walking-vs-visibility Pareto trade-off numerically for a nursing unit.
- No primary FGI text was retrieved.

## 6. Generative design examples applied to healthcare

### Takeaway
Generative design for hospitals is emerging. Examples include Autodesk Dynamo/Refinery (now Generative Design in Revit) projects that evaluate walking length and goods paths, MIP-based generators (TU Delft), PSO+BIM pipelines, graph-theoretic generators linked to BIM (Penn State), and Revit–Dynamo space-syntax scoring (Cardiff). Most are proofs-of-concept with few post-occupancy outcome data.

### Cited Findings
- Autodesk University 2020, "Generative Design for Complex Buildings: Optimizing Spaces and Flows with Dynamo and Refinery." A hospital pharmacy case evaluated walking length and new goods paths, and reported over-constrained site issues. — [Autodesk University](https://www.autodesk.com/autodesk-university/article/Generative-Design-Complex-Buildings-Optimizing-Spaces-and-Flows-Dynamo-and-Refinery-2020)
- PSO-generated 2D hospital layouts converted to 3D BIM (*Buildings* 2024, 14:2354). — [MDPI PDF](https://mdpi-res.com/d_attachment/buildings/buildings-14-02354/article_deploy/buildings-14-02354-v2.pdf?version=1722416004)
- MIP-based room placement plus corridor generation (TU Delft). — [TU Delft](https://repository.tudelft.nl/file/File_0dd30a3c-7fd2-4f54-b60a-980ae1a21847?preview=1)
- Penn State: generative near-optimal layouts scored by distance-weighted adjacency and linked to BIM, validated against expert scores. — [Penn State](https://pure.psu.edu/en/publications/implementation-and-evaluation-of-generative-layout-options-using-/)
- Cardiff 2025: Revit–Dynamo space syntax evaluation of ED layouts for patient and nurse perspectives. — [Cardiff ORCA](https://orca.cardiff.ac.uk/id/eprint/181849/1/buildings-15-03818-v4.pdf)

### Inferences (practical guidance for a design project)
1. **Build the flow matrix first.** Use time-and-motion or RTLS data, or clinical pathways (Arnolds & Gartner), to get trip frequencies by staff role between room types (patient rooms, med room, clean/soiled utility, nourishment, station, supply).
2. **Use geodesic distances** on the corridor graph (shortest paths in the plan graph), not Euclidean distances.
3. **Optimize at the right level.** Department adjacency: QAP/MIP (exact for small, matheuristic or GA/SA for large). Unit plan: generative design with walking plus targeted-visibility objectives under FGI constraints.
4. **Validate the shortlist with ABM/DES.** Include stochastic call lights, assignment rules and staffing ratios, then report distribution, not only means (Arnolds & Nickel robustness/fairness; Lee et al. 2020).
5. **Score visibility with TVI or VGA** (Lu & Zimring; Cardiff Revit–Dynamo) and present a Pareto set to clinical stakeholders.
6. **Keep supply/med decentralization in step with station decentralization**, to avoid the increased walking seen in Fay et al. (2015).

### Gaps
- No public, peer-reviewed quantified outcome of an Autodesk generative design hospital project was found.
- No post-occupancy validation linking optimized layouts to measured nurse walking reductions was found in accessible sources (beyond simulated 15% in Lee et al. 2020).
