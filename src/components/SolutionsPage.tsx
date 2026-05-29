import React, { useState, useEffect, useRef } from 'react';
import {
  Building,
  PenTool,
  Users,
  Layers,
  Truck,
  ArrowRight,
  CheckCircle,
  ShieldAlert,
  Globe,
  Search,
  ChevronRight,
} from 'lucide-react';

interface SolutionsPageProps {
  lang?: 'en' | 'ar';
  onNavigate: (tab: string) => void;
  onSelectRole: (role: 'Client' | 'Consultant' | 'Contractor' | 'Subcontractor' | 'Supplier') => void;
}

type SolutionId = 'main-contractors' | 'consultants' | 'clients' | 'subcontractors' | 'suppliers';

/* ─────────────── tiny hook: intersection observer ─────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────── animated counter ─────────────── */
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const id = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(start);
      if (start >= to) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function SolutionsPage({ lang = 'en', onNavigate, onSelectRole }: SolutionsPageProps) {
  const [activeSolution, setActiveSolution] = useState<SolutionId>('main-contractors');
  const [hovered, setHovered] = useState<number | null>(null);
  const isRtl = lang === 'ar';

  const solutionTabs = [
    { id: 'main-contractors' as const, labelEn: 'Main Contractors', labelAr: 'المقاولون الرئيسيون', icon: Building, role: 'Contractor' as const },
    { id: 'consultants' as const, labelEn: 'Consultants & PMCs', labelAr: 'الاستشاريون', icon: PenTool, role: 'Consultant' as const },
    { id: 'clients' as const, labelEn: 'Clients & Developers', labelAr: 'المطورون', icon: Users, role: 'Client' as const },
    { id: 'subcontractors' as const, labelEn: 'Subcontractors', labelAr: 'مقاولو الباطن', icon: Layers, role: 'Subcontractor' as const },
    { id: 'suppliers' as const, labelEn: 'Suppliers', labelAr: 'الموردون', icon: Truck, role: 'Supplier' as const },
  ];

  const solutionsData = {
    'main-contractors': {
      seoTitle: 'Main Contractor Procurement & Bid Management GCC | BuildFlow',
      seoTitleAr: 'إدارة مناقصات المقاول الرئيسي وتوريد المخططات بالخليج | BuildFlow',
      seoMeta: 'Optimize Tier-1 GCC contractor workflows. Streamline subcontractor bidding, FIDIC Red Book conformity, Aramco vendor alignments, and BOQ-linked pay claims.',
      seoMetaAr: 'تحسين قنوات توريد المواد لمقاولي الفئة الأولى.',
      ogTitle: 'BuildFlow GCC for Main Contractors: Unified Subcontractor & BOQ Matrix',
      ogTitleAr: 'BuildFlow الخليج للمقاولين الرئيسيين',
      ogDescription: 'Accelerate site handovers and secure supplier bids with sealed, audited messaging logs conforming to Saudi and UAE municipal standards.',
      ogDescriptionAr: 'تسريع تسليم مواقع البناء، وحيازة عطاءات الموردين.',
      heroHeadline: 'Sovereign Project Delivery for GCC Tier-1 General Contractors',
      heroHeadlineAr: 'التسليم السيادي للمشاريع الكبرى لمقاولي العموم',
      heroSubhead: 'Coordinate complex subcontractor chains, enforce FIDIC-compliant variation tracking, and align multi-billion Riyal BOQs under local municipal standards.',
      heroSubheadAr: 'تنسيق قنوات مقاولي الباطن المعقدة، فرض تتبّع التغييرات المتوافقة مع عقود فيديك.',
      stat1: { value: 94, suffix: '%', label: 'Bid accuracy improvement' },
      stat2: { value: 3, suffix: 'x', label: 'Faster claim processing' },
      stat3: { value: 40, suffix: '+', label: 'GCC municipalities supported' },
      painPointsTitle: 'Critical Giga-Project Friction Points',
      painPointsTitleAr: 'معالجة الفجوات الحرجة في تنفيذ المشاريع العملاقة',
      painPoints: [
        { title: 'Back-to-Back Cash Flow', titleAr: 'عقبات التدفق المالي المتتابع', text: 'Securing subcontractor commitment under tough payment delays while managing liquidated damages to protect core project margins.', textAr: 'ضمان التزام مقاولي الباطن بمواعيد التنفيذ رغم فجوات سداد الدفعات، مع حماية هوامش أرباح المقاول.' },
        { title: 'Subcontractor Bid Collusion', titleAr: 'تواطؤ عطاءات الباطن', text: 'Preventing pricing leaks and parallel consultations during confidential tender rounds for major MEP and civil works.', textAr: 'الحد تماماً من تسريبات الأسعار أثناء جولات طرح عروض أسعار الأعمال الميكانيكية.' },
        { title: 'RFI Logging & Delay Claims', titleAr: 'تعثر طلبات المخططات (RFI)', text: 'Late responses to site queries lead to expensive Extension of Time (EOT) claims without clear, signed audit trails.', textAr: 'تأخر الرد على استفسارات الموقع مما يؤدي لمطالبات تمديد الوقت الباهظة.' },
      ],
      featuresTitle: 'Role-Specific Structural Capabilities',
      featuresTitleAr: 'مزايا هيكلية مخصصة',
      features: [
        { title: 'BOQ-Linked Digital Tendering', titleAr: 'تفكيك وتسعير جداول الكميات التلقائي', text: 'Decompose composite master Bills of Quantities into sealed subcontractor packages with automated aggregated comparison.', textAr: 'تحليل جداول الكميات الرئيسية وتوزيع فصولها على حزم مستقلة.' },
        { title: 'FIDIC Variation Engine', titleAr: 'نظام إدارة التغييرات', text: 'Log site variation instructions chronologically with unalterable cryptographic validation to guarantee legal claim protection.', textAr: 'توثيق الأوامر التغييرية في الموقع زمنياً بختم تشفير غير قابل للتعديل.' },
        { title: 'Municipal Vendor Portal', titleAr: 'الربط مع الوزارات', text: 'Verify subcontractor prequalifications, Aramco vendor registrations, or government compliance records directly.', textAr: 'التحقق المباشر من تأهيل مقاولي الباطن وسجل عروض أرامكو.' },
        { title: 'QS-Aided Progress Claims', titleAr: 'اعتمادات المطالبات المالية', text: 'Approve digital progress claims backed by geotagged site photography and Quantity Surveyor digital attestations.', textAr: 'اعتماد مطالبات الإنجاز الشهرية مدعومة بتقارير المساحين المعتمدين.' },
      ],
      workflowTitle: 'The Execution Path',
      workflowTitleAr: 'آلية العمل التنفيذية',
      workflow: [
        { step: '01', title: 'Package Extraction', titleAr: 'تفكيك المخطط', desc: 'Upload composite master BOQ sheets; BuildFlow automatically parses segments into sealed packages.', descAr: 'تحميل كراسة جداول الكميات الرئيسية، حيث يقوم النظام بتحليلها.' },
        { step: '02', title: 'Sealed Bid Intake', titleAr: 'استقطاب العطاءات المغلقة', desc: 'Invite prequalified sub-tier contractors into separate encrypted chambers to input unit rates securely.', descAr: 'دعوة شركات الباطن المؤهلة لغرف تسعير مستقلة ومشفرة.' },
        { step: '03', title: 'Unsealing & Analysis', titleAr: 'فض المغاريف والتحليل', desc: 'Simultaneously unseal bids on the virtual tender due date, producing detailed, side-by-side margin charts.', descAr: 'فض المظاريف آلياً في الوقت المحدد لإنتاج مقارنة شاملة.' },
        { step: '04', title: 'Audit Handback', titleAr: 'رفع التوصية والاعتماد', desc: 'Export municipality-compliant bid comparison books directly to the consultant and client for final signature.', descAr: 'تصدير وثائق مقارنة العطاءات المتوافقة مع البلديات.' },
      ],
      ctaText: 'Deploy Contractor Sandbox',
      ctaTextAr: 'تفعيل لوحة المقاول التجريبية',
    },
    'consultants': {
      seoTitle: 'Engineering PMC & Design Submittal Management GCC | BuildFlow',
      seoTitleAr: 'إدارة الموافقات والاستشارات الهندسية بالخليج | BuildFlow',
      seoMeta: 'Empower Lead Consultants and PMCs. Automate RFI review cycles, shop drawing sign-offs, and Civil Defense approvals with tamper-proof logs.',
      seoMetaAr: 'تمكين الاستشاريين ومدراء المشاريع من التحكم الكامل.',
      ogTitle: 'BuildFlow for PMCs & Engineering Consultancies: Seamless Auditing',
      ogTitleAr: 'منظومة الاستشاريين وإدارة المشاريع',
      ogDescription: 'Reduce design approval delays from weeks to hours under strict regional safety codes and ministerial checklists.',
      ogDescriptionAr: 'تقليص فترات اعتماد مخططات التصاميم من أسابيع إلى ساعات.',
      heroHeadline: 'Rigorous Design Reviews & Audit-Ready Site Supervision',
      heroHeadlineAr: 'تدقيق فني صارم للمخططات وإشراف هندسي آمن',
      heroSubhead: 'Empower PMCs, architects, and structural supervision teams with rapid RFI routing, digital drawings markup, and compliant authority checksheets.',
      heroSubheadAr: 'ادعم مكاتب إدارة المشاريع والمهندسين المشرفين بمسارات توجيه ذكية.',
      stat1: { value: 78, suffix: '%', label: 'Faster RFI resolution' },
      stat2: { value: 99, suffix: '%', label: 'Audit trail completeness' },
      stat3: { value: 12, suffix: '+', label: 'Authority integrations' },
      painPointsTitle: 'Engineering Coordination Risks Resolved',
      painPointsTitleAr: 'معالجة مخاطر التنسيق الهندسي',
      painPoints: [
        { title: 'RFI Review Congestion', titleAr: 'تكدس طلبات الاستيضاح (RFI)', text: 'Endless back-and-forth emails between global design offices and execution engineers under blazing site conditions.', textAr: 'المراسلات البريدية غير المنتهية بين مكاتب التصميم ومهندسي الإشراف.' },
        { title: 'Unverifiable Design Sign-offs', titleAr: 'توقيعات هندسية غير موثقة', text: 'Lack of legal signature attestation on drawing revisions leads to liability confusion when site structural errors occur.', textAr: 'غياب التوثيق القانوني الآمن على الملاحظات الإنشائية للمخططات.' },
        { title: 'Civil Defense Audit Gap', titleAr: 'عقبات تدقيق الدفاع المدني', text: 'Scrambling to assemble historically approved structural calculation packages for local government audits.', textAr: 'صعوبة تجميع نسخ المخططات السابقة وحسابات الأحمال للجهات الحكومية.' },
      ],
      featuresTitle: 'Supervision & Design Governance',
      featuresTitleAr: 'وحدات الرقابة الهندسية',
      features: [
        { title: 'Automated Drawing Dispatch', titleAr: 'توجيه المخططات التلقائي', text: 'Route shop-drawings immediately to the specific specialist MEP, structural, or facade engineer depending on drawing codes.', textAr: 'تحويل المخططات التنفيذية لحظياً للمهندس المختص.' },
        { title: 'Live PDF Drawing Redlines', titleAr: 'التعديل الرقمي الفوري', text: 'Review, markup, stamp with approval status, and sign blueprints with vector tools natively in the browser.', textAr: 'مراجعة المخططات وإضافة التعليقات والأختام الرسمية رقمياً.' },
        { title: 'UAE PASS Integration', titleAr: 'المصادقة عبر الهوية الرقمية', text: 'Approve crucial foundation or structural milestones with identity-backed logins, keeping site logs audit-compliant.', textAr: 'التصديق المعتمد على الهيكل والأساسات باستخدام هوية المهندس.' },
        { title: 'Climatic Site Inspector Logs', titleAr: 'سجلات المفتشين للظروف الجوية', text: 'Execute and document concrete pour inspections aligning precisely with regional summer working hours and heat limits.', textAr: 'مراقبة صب وتبريد الخرسانة وساعات العمل الصيفية.' },
      ],
      workflowTitle: 'Design Review & Certification',
      workflowTitleAr: 'خطوات المراجعة والاعتماد',
      workflow: [
        { step: '01', title: 'Design Rollout', titleAr: 'توزيع التصاميم', desc: 'Establish design roles, uploading master layouts and defining specific technical approval matrices.', descAr: 'تحديد الأدوار الهندسية، تحميل التصاميم الرئيسية.' },
        { step: '02', title: 'Site RFI Trigger', titleAr: 'إرسال طلب الاستفسار', desc: 'Supervision logs automatically receive contractor RFIs via mobile interfaces, routing to designated specialists.', descAr: 'يتلقى الاستشاري الاستفسارات فوراً من الموقع.' },
        { step: '03', title: 'Direct Redlining', titleAr: 'المراجعة وإضافة الملاحظات', desc: 'Engineers redline changes directly online, avoiding paper printing and speeding up approval workflows.', descAr: 'التعليق والمراجعة الفورية للمخططات دون تداول الأوراق.' },
        { step: '04', title: 'Cryptographic Lock', titleAr: 'التوقيع المشفر', desc: 'Issue digital certificate with full system-logged proof of layout modifications ready for government submittals.', descAr: 'تصدير وثيقة مراجعة المخطط موقعة رقمياً.' },
      ],
      ctaText: 'Deploy PMC Advisor Sandbox',
      ctaTextAr: 'تفعيل حساب الاستشاري التجريبي',
    },
    'clients': {
      seoTitle: 'Executive Developer & Asset Owner Portfolio Control GCC | BuildFlow',
      seoTitleAr: 'التحكم الإستراتيجي لمطوري العقارات | BuildFlow',
      seoMeta: 'Sovereign portfolio oversight for GCC developers. Manage escrow compliance, budget leakages, and VIP status feeds.',
      seoMetaAr: 'حماية أموال ومشاريع المطورين المعتمدين.',
      ogTitle: 'BuildFlow for GCC Project Owners: Independent Capital Control',
      ogTitleAr: 'BuildFlow للشركات العقارية: السيطرة المالية الكاملة',
      ogDescription: 'Monitor capital draws, assess contractor compliance in real-time, and ensure robust project governance from a decoupled command panel.',
      ogDescriptionAr: 'تتبع السحب المالي، وتدقيق توافق المقاولين الفوري.',
      heroHeadline: 'Absolute Transparency for Prime Landmark Developers',
      heroHeadlineAr: 'الشفافية المطلقة لكبار مطوري العقارات',
      heroSubhead: 'Verify capital disbursement, monitor escrow health in compliance with DLD and Wafi regulations, and govern mega-projects from a VIP dashboard.',
      heroSubheadAr: 'دقق في دفعات الصرف المالي لمشروعاتك وراقب سلامة حسابات المطورين.',
      stat1: { value: 100, suffix: '%', label: 'Escrow visibility' },
      stat2: { value: 60, suffix: '%', label: 'Reduction in claim disputes' },
      stat3: { value: 8, suffix: '+', label: 'Regulatory frameworks' },
      painPointsTitle: 'Financial & Reputational Risks Addressed',
      painPointsTitleAr: 'حماية من مخاطر الخسائر',
      painPoints: [
        { title: 'Opaque Contractor Claims', titleAr: 'المطالبات التغييرية الغامضة', text: 'Unjustified contractor variations and claims that deplete contingency allowances and threaten development yields.', textAr: 'استنزاف ميزانية الاحتياطي بسبب الأوامر التغييرية غير المبررة.' },
        { title: 'Escrow Compliance Gaps', titleAr: 'تأخر اعتمادات حساب الضمان', text: 'Delays in verifying site work milestones, slowing down capital drawdowns and causing site labor friction.', textAr: 'تعثر صرف السيولة من حسابات الضمان نتيجة بطء التحقق.' },
        { title: 'Manipulated S-Curve Reports', titleAr: 'التقارير الإنشائية غير الدقيقة', text: 'Fictional progress updates obfuscate hidden construction delays, exposing developers to handover penalties.', textAr: 'تقارير الإنجاز المضللة تخفي التأخير الفعلي للمشروع.' },
      ],
      featuresTitle: 'Unified Investor Control Features',
      featuresTitleAr: 'المزايا الإستراتيجية',
      features: [
        { title: 'Escrow-Aligned Financial Control', titleAr: 'اعتماد سحوبات التمويل', text: 'Automate milestone tracking, ensuring payouts to Tier-1 contractors align precisely with actual approved physical progress.', textAr: 'ربط سحب الدفعات من حسابات الضمان بنسب الإنجاز الفعلي.' },
        { title: 'Live Portfolio Engagement Score', titleAr: 'مؤشر الامتثال الفوري', text: 'Real-time indicators showing active RFIs, contract document backlogs, and milestone compliance percentages.', textAr: 'مؤشرات فورية لقياس صحة المشروع ونسب وثائق العمل.' },
        { title: 'VIP Portfolio Dashboard', titleAr: 'لوحة التحكم الإستراتيجية', text: 'Independent visibility over mega-projects across regions, keeping developer executives completely informed.', textAr: 'لوحة تحكم ذكية تلخص المحفظة العقارية في بلدان مختلفة.' },
        { title: 'Ministerial License Verification', titleAr: 'التحقق من رخص المقاولين', text: 'Instantly confirm subcontractor registration dates and active local trade licenses through connected government registers.', textAr: 'التحقق التلقائي من التراخيص المهنية للمقاولين.' },
      ],
      workflowTitle: 'Executive Capital Stewardship',
      workflowTitleAr: 'دورة الرقابة المالية',
      workflow: [
        { step: '01', title: 'Global Onboarding', titleAr: 'تأسيس المشروع', desc: 'Establish master targets, select accredited consultant PMCs, and connect escrow bank structures securely.', descAr: 'تحديد المعالم الكبرى وربط مصارف التمويل.' },
        { step: '02', title: 'Compliance Setting', titleAr: 'تثبيت شروط الامتثال', desc: 'Instruct system on milestones linked to Dubai Land Department or Saudi Wafi inspection rules for disbursement validation.', descAr: 'تحديد نقاط الامتثال المرتبطة بنسب الإنجاز.' },
        { step: '03', title: 'Independent Audits', titleAr: 'التدقيق المستقل', desc: 'Real-time tracking comparison on contractor claims verified by digital quantity surveys and photos.', descAr: 'تتبع شهري مستقل لكافة المطالبات.' },
        { step: '04', title: 'Executive Extraction', titleAr: 'التقرير التنفيذي', desc: 'Direct export of comprehensive investor audit reports ready for presentation to ministry levels and company board.', descAr: 'تصدير التقارير الموثقة جاهزة للتقديم للوزارات.' },
      ],
      ctaText: 'Initiate Developer Node',
      ctaTextAr: 'تهيئة حساب المالك العقاري',
    },
    'subcontractors': {
      seoTitle: 'Specialist Subcontractor Bidding & Claims GCC | BuildFlow',
      seoTitleAr: 'مطالبات وعطاءات مقاول الباطن | BuildFlow',
      seoMeta: 'Protect subcontractor cash flow. Access Tier-1 GCC tender pipelines, submit digital progress claims, and track retention releases.',
      seoMetaAr: 'حماية السيولة النقدية لمقاولي الباطن.',
      ogTitle: 'BuildFlow for GCC Subcontractors: Secure Progress Claims',
      ogTitleAr: 'منصة مقاولي الباطن: حسم وفواتير نسب الإنجاز',
      ogDescription: 'Leverage undeniable georeferenced records, eliminate payment certification excuses, and reclaim financial balance on major commercial works.',
      ogDescriptionAr: 'استخدم سجلات العمل الموقعة للتصدي لعراقيل سداد المستخلصات.',
      heroHeadline: 'Unbiased Tender Access & Secured Subcontract Claims',
      heroHeadlineAr: 'فرص مناقصات عادلة ومستخلصات موثقة',
      heroSubhead: 'Access premier, prequalified bids, submit structured progress claims with unalterable proofs, and secure your retention timelines.',
      heroSubheadAr: 'احصل على دعوات تسعير عادلة وقدم مطالبات الدفع بأدلة هندسية غير قابلة للشك.',
      stat1: { value: 85, suffix: '%', label: 'Faster claim settlement' },
      stat2: { value: 0, suffix: ' disputes', label: 'With audit-locked records' },
      stat3: { value: 500, suffix: '+', label: 'Active subcontractors' },
      painPointsTitle: 'Payment & Scope Risks Eliminated',
      painPointsTitleAr: 'حماية مستخلصات الباطن',
      painPoints: [
        { title: 'Back-to-Back Excuses', titleAr: 'حجج السداد المشروط', text: 'Unreasonable payment blocking by main contractors stating delays in client disbursement, starving sub-tiers of cash.', textAr: 'تأخير صرف مستخلصات مقاولي الباطن بحجة عدم استلام الدفعات.' },
        { title: 'Specifications Shifting', titleAr: 'تغيير مواصفات المواد قسرياً', text: 'Verbal directives on site shift high-cost scopes without written variation agreements, creating loss-making loops.', textAr: 'الأوامر الشفهية التي تجبر المقاول على تنفيذ بنود إضافية دون تعديل مالي.' },
        { title: 'Unreleased Retention', titleAr: 'احتجاز مبالغ الضمان البنكي', text: 'Prolonged retention holding by Tier-1 contractors, ignoring project handovers and tying up subcontractor capitals.', textAr: 'تعمد المقاول الرئيسي حجز أموال الاستقطاع النهائي لسنوات.' },
      ],
      featuresTitle: 'Protected Claim & Payment Tools',
      featuresTitleAr: 'أدوات حماية المستخلصات',
      features: [
        { title: 'Signed QS Progress Claims', titleAr: 'شهادات الإنجاز الموثقة', text: 'Create claim packages combining georeferenced work logs, surveyor certificates, and secure structural records.', textAr: 'إعداد ملفات المطالبات الشهرية معززة بصور إثبات موقعية.' },
        { title: 'Scope-Lock Negotiator', titleAr: 'حماية كراسة الاتفاق', text: 'Ensure all negotiated target figures and technical conditions are immutably signed, protecting against design alterations.', textAr: 'تجميد وحظر تعديل البنود المتفاوض عليها بتشفير تعاقدي.' },
        { title: 'Retention Release Alerts', titleAr: 'منبه استرداد دفعات الاستقطاع', text: 'Automated notification loops track facility handovers, alerting general contractors of statutory deposit release dates.', textAr: 'مؤقت ذكي يتتبع تاريخ استلام المشروع ويخطر المقاول.' },
        { title: 'One-Click Prequalification', titleAr: 'ملف الاعتمادات الموحد', text: 'Deploy updated trading files, tax certifications, and active corporate records once, instantly satisfying Tier-1 criteria.', textAr: 'مشاركة سجل التأهيل والشهادات الضريبية بنقرة واحدة.' },
      ],
      workflowTitle: 'Subcontract Claim Pipeline',
      workflowTitleAr: 'مسار تأكيد وصرف المستخلصات',
      workflow: [
        { step: '01', title: 'Corporate Onboarding', titleAr: 'تسجيل الملف', desc: 'Register trade licenses, company data once to automatically populate bidding invitation tables with Tier-1 builders.', descAr: 'إدخال السجلات التجارية للتواجد في كشوف المناقصات.' },
        { step: '02', title: 'Sealed Quote Submission', titleAr: 'التسعير المغلق', desc: 'Bidding chambers securely receive your scope rates, keeping figures invisible to parallel candidates.', descAr: 'تقديم عروض الأسعار في غرف مغلقة مخصصة.' },
        { step: '03', title: 'Certified Site Claims', titleAr: 'تثبيت مستندات الإنجاز', desc: 'Log progress directly with photo stamps, converting site records to unalterable QS billing requests.', descAr: 'رفع الدلائل الموقعية من تطبيق الجوال.' },
        { step: '04', title: 'Sovereign Bank Tracking', titleAr: 'متابعة التحصيل المالي', desc: 'Obtain real-time statuses on client escrow approvals, making main contractor payment delays completely visible.', descAr: 'الحصول على قنوات متابعة الدفعة من المالك الأساسي.' },
      ],
      ctaText: 'Access Tender Pipeline',
      ctaTextAr: 'تصفح كشف المناقصات المعتمد',
    },
    'suppliers': {
      seoTitle: 'Building Material Supplier RFQ & Logistics GCC | BuildFlow',
      seoTitleAr: 'توريد مواد البناء واللوجستيات | BuildFlow',
      seoMeta: 'Streamline GCC supplier RFQs. Manage Jebel Ali customs clearances, Aramco vendor qualifications, and BOQ purchase orders.',
      seoMetaAr: 'تنظيم طلبات عروض أسعار الموردين لمواد البناء.',
      ogTitle: 'BuildFlow for Material Suppliers: High-Volume RFQ Streamlining',
      ogTitleAr: 'منظومة الموردين ومصانع مواد البناء',
      ogDescription: 'Leverage structured, error-free RFQ interfaces linked to composite BOQs, speeding up shipping validations and procurement.',
      ogDescriptionAr: 'استفد من واجهة طلبات عروض أسعار مهيكلة وخالية من الأخطاء.',
      heroHeadline: 'Seamless RFQ Channels for Materials & Logistics Leaders',
      heroHeadlineAr: 'قنوات عروض أسعار متكاملة لموردي مواد البناء',
      heroSubhead: 'Satisfy Aramco and regional utility vendor list criteria, receive structured RFQs, and secure supply payments.',
      heroSubheadAr: 'امتثل لشروط أرامكو وسجل الموردين المعتمدين واحصل على مستندات تسعير منظمة.',
      stat1: { value: 70, suffix: '%', label: 'Fewer RFQ errors' },
      stat2: { value: 48, suffix: 'hrs', label: 'Avg. customs clearance' },
      stat3: { value: 200, suffix: '+', label: 'Verified contractors' },
      painPointsTitle: 'Supply Chain Friction Eliminated',
      painPointsTitleAr: 'رفع عقبات سلسلة التوريد',
      painPoints: [
        { title: 'Non-Standard RFQs', titleAr: 'الطلبات العشوائية للتسعير', text: 'Receiving vague WhatsApp tables asking for urgent material pricing with missing technical parameters.', textAr: 'استلام استفسارات تفتقر للمواصفات الفنية المعتمدة.' },
        { title: 'Customs Attestation Blocks', titleAr: 'تعطل شحنات الموانئ', text: 'Port entry delays at Jebel Ali or King Abdullah Port due to uncertified product technical catalogs.', textAr: 'تأخر الإفراج الجمركي نتيجة نقص شهادات فحص الجودة.' },
        { title: 'Materials Payout Risk', titleAr: 'مخاطر سداد قيمة الشحنات', text: 'Delivering mega steel or cable batches without clear client escrow visibility or guaranteed letters of credit.', textAr: 'توريد طلبيات ضخمة دون التحقق المسبق من توفير السيولة.' },
      ],
      featuresTitle: 'Merchant RFQ & Dispatch Modules',
      featuresTitleAr: 'مزايا لوحة المورد',
      features: [
        { title: 'Structured Material Codes', titleAr: 'قوالب طلبات تسعير منظمة', text: 'Inbound RFQs come matched to standardized structural categories and dimensional values, preventing technical errors.', textAr: 'استقبال طلبات تسعير مصنفة طبقاً للأبعاد المعتمدة دولياً.' },
        { title: 'Customs File Builder', titleAr: 'حزمة المستندات الجمركية', text: 'Collate ISO certificates and ASTM testing blueprints automatically, speeding up port clearance times.', textAr: 'التثبيت التلقائي لشهادات الآيزو وتقارير فحوصات الخرسانة.' },
        { title: 'Payment-Bridged Delivery', titleAr: 'الشحنات بالدفع المضمون', text: 'Integrate receiving docks with certified bank credit lines, releasing funds instantly upon site supervisor checkoffs.', textAr: 'ربط إيصال استلام الشحنة باعتمادات السداد البنكي.' },
        { title: 'Auto-Submittal Generator', titleAr: 'مولد الملفات الفنية التلقائي', text: 'Package detailed technical data, warranties, and compliance credentials into sleek submittals for the PMC.', textAr: 'تحويل مواصفات المنتج وملفات الضمان لبوكليت تقني منظم.' },
      ],
      workflowTitle: 'Logistical Operations Walkthrough',
      workflowTitleAr: 'مسار التوريد والتسليم',
      workflow: [
        { step: '01', title: 'Catalog Rollout', titleAr: 'إدراج كتالوج المواد', desc: 'Deploy structural pricing tables and delivery lead times across the regional verified builder matrix.', descAr: 'تحميل قائمة المواد والمنتجات الإنشائية المعتمدة.' },
        { step: '02', title: 'Intake Filtration', titleAr: 'مراجعة طلبات التوريد', desc: 'System receives contractor pricing requests, mapped to your specific code listings with no manual noise.', descAr: 'تلقي طلبات تسعير دقيقة متوافقة مع المنتجات بالكتالوج.' },
        { step: '03', title: 'Attestation Package', titleAr: 'مشاركة باقة الاعتمادات', desc: 'Deliver complete technical submittal records digitally to the consultancy board for quick approval flags.', descAr: 'تصدير وثيقة الاعتماد الفني للاستشاري من داخل النظام.' },
        { step: '04', title: 'Verified Cash Ingress', titleAr: 'التحصيل والتسليم الآمن', desc: 'Physical material handovers release payment from escrow automatically under validated digital delivery tickets.', descAr: 'تأكيد التسليم يمرر أمر الصرف المالي فورياً.' },
      ],
      ctaText: 'Connect Supplier Catalog',
      ctaTextAr: 'تفعيل لوحة المورد',
    },
  };

  const activeData = solutionsData[activeSolution];
  const activeTab = solutionTabs.find(t => t.id === activeSolution)!;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: '#07090F',
        color: '#E8E6E0',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .mono  { font-family: 'JetBrains Mono', monospace; }

        /* Gold gradient text */
        .gold-text {
          background: linear-gradient(135deg, #C9943A 0%, #E8C97A 50%, #C9943A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtle noise overlay */
        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Tab hover */
        .sol-tab { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sol-tab:hover { color: #E8C97A; }

        /* Card hover */
        .feature-card {
          transition: border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
        }
        .feature-card:hover {
          border-color: rgba(201,148,58,0.3) !important;
          transform: translateY(-2px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,148,58,0.1);
        }

        /* Primary CTA */
        .cta-primary {
          background: linear-gradient(135deg, #C9943A, #E8C97A, #C9943A);
          background-size: 200% 200%;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
        }
        .cta-primary:hover {
          background-position: 100% 100%;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(201,148,58,0.4);
        }
        .cta-primary:active { transform: translateY(0); }

        /* Secondary CTA */
        .cta-secondary {
          transition: all 0.25s ease;
        }
        .cta-secondary:hover {
          border-color: rgba(201,148,58,0.5) !important;
          color: #E8C97A;
        }

        /* Workflow connector line */
        .workflow-grid { position: relative; }

        /* Ping dot */
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .ping { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }

        /* Fade-in-up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        /* Scrollbar hide */
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* Divider glow line */
        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,148,58,0.6), transparent);
        }

        /* Number step */
        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 3.5rem;
          line-height: 1;
          color: rgba(201,148,58,0.12);
          position: absolute;
          top: 1rem;
          right: 1.25rem;
          user-select: none;
          pointer-events: none;
        }

        /* SEO card */
        .seo-card { backdrop-filter: blur(12px); }
      `}</style>

      {/* ── Top Address Bar ── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        background: 'rgba(255,255,255,0.015)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11, color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.02em',
        }}>
          <Globe size={10} style={{ color: '#C9943A', flexShrink: 0 }} />
          <span style={{ color: 'rgba(201,148,58,0.7)' }}>https://</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>ardaca.build/</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>{activeSolution}</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9, color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '4px 12px', borderRadius: 999,
        }}>
          <span style={{ position: 'relative', display: 'inline-flex', width: 6, height: 6 }}>
            <span className="ping" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(201,148,58,0.5)',
            }} />
            <span style={{
              position: 'relative', width: 6, height: 6,
              borderRadius: '50%', background: '#C9943A',
            }} />
          </span>
          {isRtl ? 'بوابة الامتثال' : 'GCC COMPLIANCE NODE'}
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(7,9,15,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'stretch',
          gap: 0, overflowX: 'auto',
        }} className="no-scroll">
          {solutionTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeSolution === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSolution(tab.id)}
                className="sol-tab"
                style={{
                  padding: '18px 24px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #C9943A' : '2px solid transparent',
                  color: isActive ? '#E8C97A' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, fontWeight: 500, letterSpacing: '0.04em',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all 0.25s ease',
                }}
              >
                <TabIcon size={13} />
                <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative',
        padding: '100px 24px 80px',
        overflow: 'hidden',
      }} className="noise-bg">

        {/* Background orb */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 800, height: 500,
          background: 'radial-gradient(ellipse, rgba(201,148,58,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Label chip */}
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(201,148,58,0.25)',
            padding: '6px 16px', borderRadius: 999, marginBottom: 32,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(201,148,58,0.8)',
            background: 'rgba(201,148,58,0.04)',
          }}>
            <activeTab.icon size={10} />
            <span>{isRtl ? activeTab.labelAr : activeTab.labelEn} — Sovereign Solutions</span>
          </div>

          {/* Headline */}
          <h1 className="serif fade-up delay-1" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            fontWeight: 400, lineHeight: 1.15,
            maxWidth: 780, marginBottom: 24,
            letterSpacing: '-0.01em',
            color: '#F0EDE6',
          }}>
            {isRtl ? activeData.heroHeadlineAr : activeData.heroHeadline}
          </h1>

          {/* Subhead */}
          <p className="fade-up delay-2" style={{
            fontSize: 15, lineHeight: 1.7, fontWeight: 300,
            color: 'rgba(255,255,255,0.45)', maxWidth: 600, marginBottom: 40,
          }}>
            {isRtl ? activeData.heroSubheadAr : activeData.heroSubhead}
          </p>

          {/* CTAs */}
          <div className="fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 64 }}>
            <button
              className="cta-primary"
              onClick={() => { onSelectRole(activeTab.role); onNavigate(`${activeTab.role.toLowerCase()}_dashboard`); }}
              style={{
                padding: '13px 28px', borderRadius: 6, border: 'none',
                color: '#0A0C12', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              <span>{isRtl ? activeData.ctaTextAr : activeData.ctaText}</span>
              <ArrowRight size={13} />
            </button>
            <button
              className="cta-secondary"
              onClick={() => onNavigate('register_kyc')}
              style={{
                padding: '13px 28px', borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: 'pointer', background: 'transparent',
              }}
            >
              {isRtl ? 'تقديم السجل (KYC)' : 'Fast-Track Onboarding'}
            </button>
          </div>

          {/* Stats row */}
          <div className="fade-up delay-4" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12, overflow: 'hidden', maxWidth: 680,
          }}>
            {[activeData.stat1, activeData.stat2, activeData.stat3].map((s, i) => (
              <div key={i} style={{
                background: '#07090F', padding: '24px 28px',
              }}>
                <div className="serif" style={{
                  fontSize: 36, fontWeight: 400, lineHeight: 1,
                  background: 'linear-gradient(135deg, #C9943A, #E8C97A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: 6,
                }}>
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', fontWeight: 400 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO Preview ── */}
      <div style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '32px 36px',
            position: 'relative',
          }} className="seo-card">
            <div style={{
              position: 'absolute', top: 0, right: 0,
              background: 'rgba(201,148,58,0.08)',
              border: '1px solid rgba(201,148,58,0.2)',
              borderTop: 'none', borderRight: 'none',
              borderRadius: '0 16px 0 12px',
              padding: '6px 14px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(201,148,58,0.7)',
            }}>
              <Search size={8} style={{ display: 'inline', marginRight: 5 }} />
              {isRtl ? 'معاينة السيو' : 'SEO Preview'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {/* Google */}
              <div>
                <p style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Google SERP
                </p>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, padding: 18,
                }}>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>
                    https://ardaca.build › <span style={{ color: 'rgba(201,148,58,0.6)' }}>{activeSolution}</span>
                  </p>
                  <p style={{ fontSize: 14, color: '#5BA36B', fontWeight: 500, marginBottom: 6, lineHeight: 1.3 }}>
                    {isRtl ? activeData.seoTitleAr : activeData.seoTitle}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.55, fontWeight: 300 }}>
                    {isRtl ? activeData.seoMetaAr : activeData.seoMeta}
                  </p>
                </div>
              </div>

              {/* OG */}
              <div>
                <p style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                  OpenGraph Preview
                </p>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, overflow: 'hidden',
                }}>
                  <div style={{
                    height: 48, padding: '0 18px',
                    background: 'linear-gradient(90deg, rgba(201,148,58,0.08), rgba(255,255,255,0.02))',
                    display: 'flex', alignItems: 'center', gap: 10,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: 'rgba(201,148,58,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: '#C9943A',
                    }}>B</div>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'JetBrains Mono, monospace' }}>
                      ardaca.build
                    </span>
                  </div>
                  <div style={{ padding: 18 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#E8C97A', marginBottom: 6, lineHeight: 1.3 }}>
                      {isRtl ? activeData.ogTitleAr : activeData.ogTitle}
                    </p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.55, fontWeight: 300 }}>
                      {isRtl ? activeData.ogDescriptionAr : activeData.ogDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAIN POINTS ── */}
      <Section>
        <SectionHeader
          title={isRtl ? activeData.painPointsTitleAr : activeData.painPointsTitle}
          tag={isRtl ? 'تحديات القطاع' : 'Industry Challenges'}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 16, overflow: 'hidden' }}>
          {activeData.painPoints.map((p, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                background: '#07090F',
                padding: '36px 32px',
                position: 'relative', overflow: 'hidden',
                border: 'none',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(201,148,58,0.06)',
                border: '1px solid rgba(201,148,58,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <ShieldAlert size={15} style={{ color: '#C9943A' }} />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE6', marginBottom: 10, letterSpacing: '-0.01em' }}>
                {isRtl ? p.titleAr : p.title}
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontWeight: 300 }}>
                {isRtl ? p.textAr : p.text}
              </p>
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '100%', height: 1,
                background: 'rgba(255,255,255,0.04)',
              }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── FEATURES ── */}
      <Section>
        <SectionHeader
          title={isRtl ? activeData.featuresTitleAr : activeData.featuresTitle}
          tag={isRtl ? 'المزايا الأساسية' : 'Core Capabilities'}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {activeData.features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14, padding: '28px 28px',
                display: 'flex', gap: 20, alignItems: 'flex-start',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Hover glow */}
              <div style={{
                position: 'absolute', top: -40, left: -40,
                width: 120, height: 120,
                background: 'radial-gradient(circle, rgba(201,148,58,0.08), transparent 70%)',
                opacity: hovered === i ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }} />
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'rgba(201,148,58,0.06)',
                border: '1px solid rgba(201,148,58,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle size={16} style={{ color: '#C9943A' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE6', marginBottom: 8, letterSpacing: '-0.01em' }}>
                  {isRtl ? f.titleAr : f.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontWeight: 300 }}>
                  {isRtl ? f.textAr : f.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WORKFLOW ── */}
      <Section>
        <SectionHeader
          title={isRtl ? activeData.workflowTitleAr : activeData.workflowTitle}
          tag={isRtl ? 'المسار التنفيذي' : 'Execution Path'}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 16, overflow: 'hidden' }} className="workflow-grid">
          {activeData.workflow.map((w, i) => (
            <div key={i} style={{
              background: '#07090F',
              padding: '36px 28px 32px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Large step number watermark */}
              <span className="step-num mono">{w.step}</span>

              {/* Step indicator */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 9, color: 'rgba(201,148,58,0.6)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                <span>{w.step}</span>
                {i < activeData.workflow.length - 1 && (
                  <ChevronRight size={8} style={{ color: 'rgba(201,148,58,0.3)' }} />
                )}
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE6', marginBottom: 10, letterSpacing: '-0.01em' }}>
                {isRtl ? w.titleAr : w.title}
              </h3>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, fontWeight: 300 }}>
                {isRtl ? w.descAr : w.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CLOSING CTA BANNER ── */}
      <div style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(201,148,58,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(201,148,58,0.05) 100%)',
            border: '1px solid rgba(201,148,58,0.2)',
            borderRadius: 20, padding: '56px 60px',
          }}>
            {/* Diagonal grid */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `linear-gradient(rgba(201,148,58,0.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(201,148,58,0.04) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }} />
            <div style={{
              position: 'absolute', top: -100, right: -100,
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(201,148,58,0.07), transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 40, flexWrap: 'wrap',
            }}>
              <div style={{ maxWidth: 560 }}>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(201,148,58,0.6)', marginBottom: 16,
                }}>
                  {isRtl ? 'هل أنت جاهز؟' : 'Ready to Deploy'}
                </p>
                <h2 className="serif" style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
                  fontWeight: 400, color: '#F0EDE6', lineHeight: 1.3,
                  letterSpacing: '-0.01em', marginBottom: 14,
                }}>
                  {isRtl
                    ? 'جاهز لتجربة البيئة السيادية المخصصة لدورك؟'
                    : 'Ready for the sovereign sandbox tailored to your role?'}
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontWeight: 300 }}>
                  {isRtl
                    ? 'مكّن فريقك من تتبع المطالبات وتصديقات الدفاع المدني بضغطة واحدة.'
                    : 'Give your team tamper-proof audit trails and instant ministerial conformity across the GCC.'}
                </p>
              </div>

              <button
                className="cta-primary"
                onClick={() => { onSelectRole(activeTab.role); onNavigate(`${activeTab.role.toLowerCase()}_dashboard`); }}
                style={{
                  padding: '15px 32px', borderRadius: 8, border: 'none',
                  color: '#0A0C12', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
                  flexShrink: 0,
                }}
              >
                <span>{isRtl ? activeData.ctaTextAr : activeData.ctaText}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Layout helpers ─────────────── */
function Section({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '0 24px 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

function SectionHeader({ title, tag }: { title: string; tag: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(201,148,58,0.6)', marginBottom: 12,
      }}>{tag}</p>
      <h2 style={{
        fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
        fontWeight: 700, color: '#F0EDE6',
        letterSpacing: '-0.02em', lineHeight: 1.2,
      }}>{title}</h2>
      <div style={{
        marginTop: 16, height: 1,
        background: 'linear-gradient(90deg, rgba(201,148,58,0.4), transparent)',
        width: 80,
      }} />
    </div>
  );
}