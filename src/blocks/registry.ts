import type { Block } from 'payload'
import type { ComponentType } from 'react'

import { HeroBlock } from './Hero/config'
import { TrustedByBlock } from './TrustedBy/config'
import { FeaturesBlock } from './Features/config'
import { HowItWorksBlock } from './HowItWorks/config'
import { CtaBannerBlock } from './CtaBanner/config'
import { FaqBlock } from './Faq/config'
import { SectionHeaderBlock } from './SectionHeader/config'
import { SpacerBlock } from './Spacer/config'
import { FeatureGridBlock } from './FeatureGrid/config'
import { ProfileGridBlock } from './ProfileGrid/config'
import { SplitContentBlock } from './SplitContent/config'
import { ActionBannerBlock } from './ActionBanner/config'
import { AccordionListBlock } from './AccordionList/config'
import { ContactSplitBlock } from './ContactSplit/config'
import { BentoGridBlock } from './BentoGrid/config'

import { HeroSection } from './Hero/Component'
import { TrustedBySection } from './TrustedBy/Component'
import { FeaturesSection } from './Features/Component'
import { HowItWorksSection } from './HowItWorks/Component'
import { CtaBannerSection } from './CtaBanner/Component'
import { FaqSection } from './Faq/Component'
import { SectionHeaderComponent } from './SectionHeader/Component'
import { SpacerComponent } from './Spacer/Component'
import { FeatureGridComponent } from './FeatureGrid/Component'
import { ProfileGridComponent } from './ProfileGrid/Component'
import { SplitContentComponent } from './SplitContent/Component'
import { ActionBannerComponent } from './ActionBanner/Component'
import { AccordionListComponent } from './AccordionList/Component'
import { ContactSplitComponent } from './ContactSplit/Component'
import { BentoGridComponent } from './BentoGrid/Component'

export const pageBlocks: Block[] = [
  HeroBlock,
  TrustedByBlock,
  FeaturesBlock,
  HowItWorksBlock,
  FaqBlock,
  CtaBannerBlock,
  SectionHeaderBlock,
  SpacerBlock,
  FeatureGridBlock,
  AccordionListBlock,
  ContactSplitBlock,
  BentoGridBlock,
  ProfileGridBlock,
  SplitContentBlock,
  ActionBannerBlock,
]

export const blockComponentMap: Record<string, ComponentType<Record<string, unknown>>> = {
  hero: HeroSection,
  trustedBy: TrustedBySection,
  features: FeaturesSection,
  howItWorks: HowItWorksSection,
  faq: FaqSection,
  ctaBanner: CtaBannerSection,
  sectionHeader: SectionHeaderComponent,
  spacer: SpacerComponent,
  featureGrid: FeatureGridComponent,
  profileGrid: ProfileGridComponent,
  splitContent: SplitContentComponent,
  actionBanner: ActionBannerComponent,
  accordionList: AccordionListComponent,
  contactSplit: ContactSplitComponent,
  bentoGrid: BentoGridComponent,
}
