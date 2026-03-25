import { CategoryCardBlock } from './CategoryCard/config'
import { CategoryCardBlock as CategoryCardComponent } from './CategoryCard/Component'
import type { Block } from 'payload'
import type { ComponentType } from 'react'

import { HeroBlock } from './Hero/config'
import { TrustedByBlock } from './TrustedBy/config'
import { FeaturesBlock } from './Features/config'
import { HowItWorksBlock } from './HowItWorks/config'
import { CtaBannerBlock } from './CtaBanner/config'
import { ProcessTimelineBlock } from './ProcessTimeline/config'
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
import { TestimonialGridBlock } from './TestimonialGrid/config'

import { HeroComponent } from './Hero/Component'
import { TrustedByComponent as TrustedByComponent } from './TrustedBy/Component'
import { FeaturesComponent } from './Features/Component'
import { HowItWorksComponent } from './HowItWorks/Component'
import { CtaBannerComponent } from './CtaBanner/Component'
import { ProcessTimelineComponentAdapter } from './ProcessTimeline/BlockAdapter'
import { FaqComponent } from './Faq/Component'
import { SectionHeaderComponent } from './SectionHeader/Component'
import { SpacerComponent } from './Spacer/Component'
import { FeatureGridComponent } from './FeatureGrid/Component'
import { ProfileGridComponent } from './ProfileGrid/Component'
import { SplitContentComponent } from './SplitContent/Component'
import { ActionBannerComponent } from './ActionBanner/Component'
import { AccordionListComponent } from './AccordionList/Component'
import { ContactSplitComponent } from './ContactSplit/Component'
import { BentoGridComponent } from './BentoGrid/Component'
import { TestimonialGridComponent } from './TestimonialGrid/Component'

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
  ProcessTimelineBlock,
  CategoryCardBlock,
  TestimonialGridBlock,
]

export const blockComponentMap: Record<string, ComponentType<Record<string, unknown>>> = {
  hero: HeroComponent,
  trustedBy: TrustedByComponent,
  features: FeaturesComponent,
  howItWorks: HowItWorksComponent,
  faq: FaqComponent,
  ctaBanner: CtaBannerComponent as ComponentType<Record<string, unknown>>,
  sectionHeader: SectionHeaderComponent,
  spacer: SpacerComponent,
  featureGrid: FeatureGridComponent,
  profileGrid: ProfileGridComponent,
  splitContent: SplitContentComponent,
  actionBanner: ActionBannerComponent,
  accordionList: AccordionListComponent,
  contactSplit: ContactSplitComponent,
  bentoGrid: BentoGridComponent,
  processTimeline: ProcessTimelineComponentAdapter,
  categoryCard: CategoryCardComponent as ComponentType<Record<string, unknown>>,
  testimonialGrid: TestimonialGridComponent as ComponentType<Record<string, unknown>>,
}
