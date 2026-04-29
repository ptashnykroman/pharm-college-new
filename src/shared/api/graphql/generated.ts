import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  CycleCommissionLeftSidebarDynamicZoneInput: { input: any; output: any; }
  CycleCommissionPageComponentsDynamicZoneInput: { input: any; output: any; }
  CycleCommissionRightSidebarDynamicZoneInput: { input: any; output: any; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSON: { input: unknown; output: unknown; }
  PageLeftSidebarDynamicZoneInput: { input: any; output: any; }
  PagePageComponentsDynamicZoneInput: { input: any; output: any; }
  PageRightSidebarDynamicZoneInput: { input: any; output: any; }
  SubdivisionLeftSidebarDynamicZoneInput: { input: any; output: any; }
  SubdivisionPageComponentsDynamicZoneInput: { input: any; output: any; }
  SubdivisionRightSidebarDynamicZoneInput: { input: any; output: any; }
  Upload: { input: unknown; output: unknown; }
  VidilenyaLeftSidebarDynamicZoneInput: { input: any; output: any; }
  VidilenyaPageComponentsDynamicZoneInput: { input: any; output: any; }
  VidilenyaRightSidebarDynamicZoneInput: { input: any; output: any; }
};

export type Advertisement = {
  readonly __typename?: 'Advertisement';
  readonly body: Scalars['String']['output'];
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type AdvertisementEntity = {
  readonly __typename?: 'AdvertisementEntity';
  readonly attributes: Maybe<Advertisement>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type AdvertisementEntityResponse = {
  readonly __typename?: 'AdvertisementEntityResponse';
  readonly data: Maybe<AdvertisementEntity>;
};

export type AdvertisementEntityResponseCollection = {
  readonly __typename?: 'AdvertisementEntityResponseCollection';
  readonly data: ReadonlyArray<AdvertisementEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type AdvertisementFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<AdvertisementFiltersInput>>>;
  readonly body: InputMaybe<StringFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly not: InputMaybe<AdvertisementFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<AdvertisementFiltersInput>>>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type AdvertisementInput = {
  readonly body: InputMaybe<Scalars['String']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type BooleanFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']['input']>>>;
  readonly contains: InputMaybe<Scalars['Boolean']['input']>;
  readonly containsi: InputMaybe<Scalars['Boolean']['input']>;
  readonly endsWith: InputMaybe<Scalars['Boolean']['input']>;
  readonly eq: InputMaybe<Scalars['Boolean']['input']>;
  readonly eqi: InputMaybe<Scalars['Boolean']['input']>;
  readonly gt: InputMaybe<Scalars['Boolean']['input']>;
  readonly gte: InputMaybe<Scalars['Boolean']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']['input']>>>;
  readonly lt: InputMaybe<Scalars['Boolean']['input']>;
  readonly lte: InputMaybe<Scalars['Boolean']['input']>;
  readonly ne: InputMaybe<Scalars['Boolean']['input']>;
  readonly nei: InputMaybe<Scalars['Boolean']['input']>;
  readonly not: InputMaybe<BooleanFilterInput>;
  readonly notContains: InputMaybe<Scalars['Boolean']['input']>;
  readonly notContainsi: InputMaybe<Scalars['Boolean']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Boolean']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentHeaderHeader = {
  readonly __typename?: 'ComponentHeaderHeader';
  readonly headerBackground: Maybe<ComponentHeaderHeaderBackground>;
  readonly headerIcons: Maybe<ReadonlyArray<Maybe<ComponentUiIconButton>>>;
  readonly id: Scalars['ID']['output'];
  readonly logo: UploadFileEntityResponse;
  readonly navigation: Maybe<ReadonlyArray<Maybe<ComponentHeaderSubmenu1>>>;
  readonly social: Maybe<ComponentUiSocial>;
  readonly title: Scalars['String']['output'];
};


export type ComponentHeaderHeaderHeaderIconsArgs = {
  filters: InputMaybe<ComponentUiIconButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentHeaderHeaderNavigationArgs = {
  filters: InputMaybe<ComponentHeaderSubmenu1FiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentHeaderHeaderBackground = {
  readonly __typename?: 'ComponentHeaderHeaderBackground';
  readonly backgroundType: Enum_Componentheaderheaderbackground_Backgroundtype;
  readonly frame_poster: Maybe<UploadFileEntityResponse>;
  readonly id: Scalars['ID']['output'];
  readonly iframe_url: Maybe<Scalars['String']['output']>;
  readonly image: Maybe<UploadFileEntityResponse>;
  readonly slider: Maybe<UploadFileRelationResponseCollection>;
  readonly video: Maybe<UploadFileEntityResponse>;
  readonly video_poster_primary: Maybe<UploadFileEntityResponse>;
  readonly video_poster_secondary: Maybe<UploadFileEntityResponse>;
};


export type ComponentHeaderHeaderBackgroundSliderArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentHeaderHeaderBackgroundInput = {
  readonly backgroundType: InputMaybe<Enum_Componentheaderheaderbackground_Backgroundtype>;
  readonly frame_poster: InputMaybe<Scalars['ID']['input']>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly iframe_url: InputMaybe<Scalars['String']['input']>;
  readonly image: InputMaybe<Scalars['ID']['input']>;
  readonly slider: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly video: InputMaybe<Scalars['ID']['input']>;
  readonly video_poster_primary: InputMaybe<Scalars['ID']['input']>;
  readonly video_poster_secondary: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentHeaderHeaderInput = {
  readonly headerBackground: InputMaybe<ComponentHeaderHeaderBackgroundInput>;
  readonly headerIcons: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiIconButtonInput>>>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly logo: InputMaybe<Scalars['ID']['input']>;
  readonly navigation: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu1Input>>>;
  readonly social: InputMaybe<ComponentUiSocialInput>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type ComponentHeaderSubmenu1 = {
  readonly __typename?: 'ComponentHeaderSubmenu1';
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly submenu: Maybe<ReadonlyArray<Maybe<ComponentHeaderSubmenu2>>>;
  readonly text: Scalars['String']['output'];
};


export type ComponentHeaderSubmenu1SubmenuArgs = {
  filters: InputMaybe<ComponentHeaderSubmenu2FiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentHeaderSubmenu1FiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu1FiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentHeaderSubmenu1FiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu1FiltersInput>>>;
  readonly submenu: InputMaybe<ComponentHeaderSubmenu2FiltersInput>;
  readonly text: InputMaybe<StringFilterInput>;
};

export type ComponentHeaderSubmenu1Input = {
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly submenu: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu2Input>>>;
  readonly text: InputMaybe<Scalars['String']['input']>;
};

export type ComponentHeaderSubmenu2 = {
  readonly __typename?: 'ComponentHeaderSubmenu2';
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly submenu: Maybe<ReadonlyArray<Maybe<ComponentHeaderSubmenu3>>>;
  readonly text: Scalars['String']['output'];
};


export type ComponentHeaderSubmenu2SubmenuArgs = {
  filters: InputMaybe<ComponentHeaderSubmenu3FiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentHeaderSubmenu2FiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu2FiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentHeaderSubmenu2FiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu2FiltersInput>>>;
  readonly submenu: InputMaybe<ComponentHeaderSubmenu3FiltersInput>;
  readonly text: InputMaybe<StringFilterInput>;
};

export type ComponentHeaderSubmenu2Input = {
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly submenu: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu3Input>>>;
  readonly text: InputMaybe<Scalars['String']['input']>;
};

export type ComponentHeaderSubmenu3 = {
  readonly __typename?: 'ComponentHeaderSubmenu3';
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly text: Scalars['String']['output'];
};

export type ComponentHeaderSubmenu3FiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu3FiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentHeaderSubmenu3FiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentHeaderSubmenu3FiltersInput>>>;
  readonly text: InputMaybe<StringFilterInput>;
};

export type ComponentHeaderSubmenu3Input = {
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly text: InputMaybe<Scalars['String']['input']>;
};

export type ComponentPageBlocksAccordion = {
  readonly __typename?: 'ComponentPageBlocksAccordion';
  readonly body: Scalars['String']['output'];
  readonly component_type: Scalars['String']['output'];
  readonly default_open: Scalars['Boolean']['output'];
  readonly id: Scalars['ID']['output'];
  readonly title: Scalars['String']['output'];
};

export type ComponentPageBlocksBody = {
  readonly __typename?: 'ComponentPageBlocksBody';
  readonly body: Scalars['String']['output'];
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
};

export type ComponentPageBlocksButtonImage = {
  readonly __typename?: 'ComponentPageBlocksButtonImage';
  readonly id: Scalars['ID']['output'];
  readonly image: UploadFileEntityResponse;
  readonly link: Scalars['String']['output'];
};

export type ComponentPageBlocksButtonImageFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentPageBlocksButtonImageFiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentPageBlocksButtonImageFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentPageBlocksButtonImageFiltersInput>>>;
};

export type ComponentPageBlocksButtonImages = {
  readonly __typename?: 'ComponentPageBlocksButtonImages';
  readonly Components: ReadonlyArray<Maybe<ComponentPageBlocksButtonImage>>;
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
};


export type ComponentPageBlocksButtonImagesComponentsArgs = {
  filters: InputMaybe<ComponentPageBlocksButtonImageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentPageBlocksButtonLink = {
  readonly __typename?: 'ComponentPageBlocksButtonLink';
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly text: Scalars['String']['output'];
};

export type ComponentPageBlocksEducationBooks = {
  readonly __typename?: 'ComponentPageBlocksEducationBooks';
  readonly add_container: Scalars['Boolean']['output'];
  readonly authors: Maybe<ComponentPageBlocksAccordion>;
  readonly component_type: Scalars['String']['output'];
  readonly description: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly main_photo: UploadFileEntityResponse;
};

export type ComponentPageBlocksFrame = {
  readonly __typename?: 'ComponentPageBlocksFrame';
  readonly Frame: Scalars['String']['output'];
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
};

export type ComponentPageBlocksFullSizePerson = {
  readonly __typename?: 'ComponentPageBlocksFullSizePerson';
  readonly body: Scalars['String']['output'];
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly photo: UploadFileEntityResponse;
};

export type ComponentPageBlocksPageCard = {
  readonly __typename?: 'ComponentPageBlocksPageCard';
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly name: Scalars['String']['output'];
  readonly photo: UploadFileEntityResponse;
};

export type ComponentPageBlocksPageCardFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentPageBlocksPageCardFiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentPageBlocksPageCardFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentPageBlocksPageCardFiltersInput>>>;
};

export type ComponentPageBlocksPageCards = {
  readonly __typename?: 'ComponentPageBlocksPageCards';
  readonly cards: Maybe<ReadonlyArray<Maybe<ComponentPageBlocksPageCard>>>;
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
};


export type ComponentPageBlocksPageCardsCardsArgs = {
  filters: InputMaybe<ComponentPageBlocksPageCardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentPageBlocksPanorams = {
  readonly __typename?: 'ComponentPageBlocksPanorams';
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly panoramas: Maybe<PanoramaRelationResponseCollection>;
  readonly title: Scalars['String']['output'];
  readonly withBackground: Scalars['Boolean']['output'];
};


export type ComponentPageBlocksPanoramsPanoramasArgs = {
  filters: InputMaybe<PanoramaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentPageBlocksPartner = {
  readonly __typename?: 'ComponentPageBlocksPartner';
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly partner_category: Enum_Componentpageblockspartner_Partner_Category;
  readonly partner_link: Scalars['String']['output'];
  readonly partner_presentation_link: Maybe<Scalars['String']['output']>;
};

export type ComponentPageBlocksPartnersBlock = {
  readonly __typename?: 'ComponentPageBlocksPartnersBlock';
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly partners: Maybe<PartnerRelationResponseCollection>;
  readonly title: Scalars['String']['output'];
};


export type ComponentPageBlocksPartnersBlockPartnersArgs = {
  filters: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentPageBlocksPerson = {
  readonly __typename?: 'ComponentPageBlocksPerson';
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly worker: Maybe<WorkerEntityResponse>;
};

export type ComponentPageBlocksPhotosGallery = {
  readonly __typename?: 'ComponentPageBlocksPhotosGallery';
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly images: UploadFileRelationResponseCollection;
  readonly title: Scalars['String']['output'];
};


export type ComponentPageBlocksPhotosGalleryImagesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentPageBlocksTwoColumnWithImage = {
  readonly __typename?: 'ComponentPageBlocksTwoColumnWithImage';
  readonly body: Scalars['String']['output'];
  readonly component_type: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly image: UploadFileEntityResponse;
  readonly layout: Enum_Componentpageblockstwocolumnwithimage_Layout;
};

export type ComponentPagesMeta = {
  readonly __typename?: 'ComponentPagesMeta';
  readonly content: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
};

export type ComponentPagesMetaFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentPagesMetaFiltersInput>>>;
  readonly content: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentPagesMetaFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentPagesMetaFiltersInput>>>;
};

export type ComponentPagesMetaInput = {
  readonly content: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
};

export type ComponentPagesSeo = {
  readonly __typename?: 'ComponentPagesSeo';
  readonly description: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly meta: Maybe<ReadonlyArray<Maybe<ComponentPagesMeta>>>;
  readonly title: Scalars['String']['output'];
};


export type ComponentPagesSeoMetaArgs = {
  filters: InputMaybe<ComponentPagesMetaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentPagesSeoFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentPagesSeoFiltersInput>>>;
  readonly description: InputMaybe<StringFilterInput>;
  readonly meta: InputMaybe<ComponentPagesMetaFiltersInput>;
  readonly not: InputMaybe<ComponentPagesSeoFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentPagesSeoFiltersInput>>>;
  readonly title: InputMaybe<StringFilterInput>;
};

export type ComponentPagesSeoInput = {
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly meta: InputMaybe<ReadonlyArray<InputMaybe<ComponentPagesMetaInput>>>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type ComponentUiFooterSocial = {
  readonly __typename?: 'ComponentUiFooterSocial';
  readonly icon: UploadFileEntityResponse;
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
};

export type ComponentUiFooterSocialFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiFooterSocialFiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentUiFooterSocialFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiFooterSocialFiltersInput>>>;
};

export type ComponentUiFooterSocialInput = {
  readonly icon: InputMaybe<Scalars['ID']['input']>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly link: InputMaybe<Scalars['String']['input']>;
};

export type ComponentUiHomePageContactItem = {
  readonly __typename?: 'ComponentUiHomePageContactItem';
  readonly email: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly phone: Scalars['String']['output'];
  readonly position: Scalars['String']['output'];
};

export type ComponentUiHomePageContactItemFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageContactItemFiltersInput>>>;
  readonly email: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentUiHomePageContactItemFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageContactItemFiltersInput>>>;
  readonly phone: InputMaybe<StringFilterInput>;
  readonly position: InputMaybe<StringFilterInput>;
};

export type ComponentUiHomePageContactItemInput = {
  readonly email: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly phone: InputMaybe<Scalars['String']['input']>;
  readonly position: InputMaybe<Scalars['String']['input']>;
};

export type ComponentUiHomePageGalleryItem = {
  readonly __typename?: 'ComponentUiHomePageGalleryItem';
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly photo: UploadFileEntityResponse;
  readonly title: Scalars['String']['output'];
};

export type ComponentUiHomePageGalleryItemFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageGalleryItemFiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentUiHomePageGalleryItemFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageGalleryItemFiltersInput>>>;
  readonly title: InputMaybe<StringFilterInput>;
};

export type ComponentUiHomePageGalleryItemInput = {
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly photo: InputMaybe<Scalars['ID']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type ComponentUiHomePageStat = {
  readonly __typename?: 'ComponentUiHomePageStat';
  readonly id: Scalars['ID']['output'];
  readonly num: Scalars['String']['output'];
  readonly text: Scalars['String']['output'];
};

export type ComponentUiHomePageStatFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageStatFiltersInput>>>;
  readonly not: InputMaybe<ComponentUiHomePageStatFiltersInput>;
  readonly num: InputMaybe<StringFilterInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageStatFiltersInput>>>;
  readonly text: InputMaybe<StringFilterInput>;
};

export type ComponentUiHomePageStatInput = {
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly num: InputMaybe<Scalars['String']['input']>;
  readonly text: InputMaybe<Scalars['String']['input']>;
};

export type ComponentUiIconButton = {
  readonly __typename?: 'ComponentUiIconButton';
  readonly icon: UploadFileEntityResponse;
  readonly id: Scalars['ID']['output'];
  readonly link: Scalars['String']['output'];
  readonly text: Maybe<Scalars['String']['output']>;
};

export type ComponentUiIconButtonFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiIconButtonFiltersInput>>>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ComponentUiIconButtonFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiIconButtonFiltersInput>>>;
  readonly text: InputMaybe<StringFilterInput>;
};

export type ComponentUiIconButtonInput = {
  readonly icon: InputMaybe<Scalars['ID']['input']>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly text: InputMaybe<Scalars['String']['input']>;
};

export type ComponentUiSocial = {
  readonly __typename?: 'ComponentUiSocial';
  readonly icons: ReadonlyArray<Maybe<ComponentUiIconButton>>;
  readonly id: Scalars['ID']['output'];
  readonly text: Maybe<Scalars['String']['output']>;
};


export type ComponentUiSocialIconsArgs = {
  filters: InputMaybe<ComponentUiIconButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentUiSocialInput = {
  readonly icons: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiIconButtonInput>>>;
  readonly id: InputMaybe<Scalars['ID']['input']>;
  readonly text: InputMaybe<Scalars['String']['input']>;
};

export type CycleCommission = {
  readonly __typename?: 'CycleCommission';
  readonly SEO: Maybe<ComponentPagesSeo>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly headOfCommission: Maybe<WorkerEntityResponse>;
  readonly layout: Enum_Cyclecommission_Layout;
  readonly left_sidebar: Maybe<ReadonlyArray<Maybe<CycleCommissionLeftSidebarDynamicZone>>>;
  readonly main_photo: UploadFileRelationResponseCollection;
  readonly name: Scalars['String']['output'];
  readonly page_components: Maybe<ReadonlyArray<Maybe<CycleCommissionPageComponentsDynamicZone>>>;
  readonly page_url: Scalars['String']['output'];
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly right_sidebar: Maybe<ReadonlyArray<Maybe<CycleCommissionRightSidebarDynamicZone>>>;
  readonly slug: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly workers: Maybe<WorkerRelationResponseCollection>;
};


export type CycleCommissionMain_PhotoArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type CycleCommissionWorkersArgs = {
  filters: InputMaybe<WorkerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type CycleCommissionEntity = {
  readonly __typename?: 'CycleCommissionEntity';
  readonly attributes: Maybe<CycleCommission>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type CycleCommissionEntityResponse = {
  readonly __typename?: 'CycleCommissionEntityResponse';
  readonly data: Maybe<CycleCommissionEntity>;
};

export type CycleCommissionEntityResponseCollection = {
  readonly __typename?: 'CycleCommissionEntityResponseCollection';
  readonly data: ReadonlyArray<CycleCommissionEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type CycleCommissionFiltersInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoFiltersInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<CycleCommissionFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly headOfCommission: InputMaybe<WorkerFiltersInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly layout: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<CycleCommissionFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<CycleCommissionFiltersInput>>>;
  readonly page_url: InputMaybe<StringFilterInput>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly slug: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly workers: InputMaybe<WorkerFiltersInput>;
};

export type CycleCommissionInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoInput>;
  readonly headOfCommission: InputMaybe<Scalars['ID']['input']>;
  readonly layout: InputMaybe<Enum_Cyclecommission_Layout>;
  readonly left_sidebar: InputMaybe<ReadonlyArray<Scalars['CycleCommissionLeftSidebarDynamicZoneInput']['input']>>;
  readonly main_photo: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly page_components: InputMaybe<ReadonlyArray<Scalars['CycleCommissionPageComponentsDynamicZoneInput']['input']>>;
  readonly page_url: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly right_sidebar: InputMaybe<ReadonlyArray<Scalars['CycleCommissionRightSidebarDynamicZoneInput']['input']>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
  readonly workers: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
};

export type CycleCommissionLeftSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type CycleCommissionPageComponentsDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type CycleCommissionRightSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type DateFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']['input']>>>;
  readonly contains: InputMaybe<Scalars['Date']['input']>;
  readonly containsi: InputMaybe<Scalars['Date']['input']>;
  readonly endsWith: InputMaybe<Scalars['Date']['input']>;
  readonly eq: InputMaybe<Scalars['Date']['input']>;
  readonly eqi: InputMaybe<Scalars['Date']['input']>;
  readonly gt: InputMaybe<Scalars['Date']['input']>;
  readonly gte: InputMaybe<Scalars['Date']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']['input']>>>;
  readonly lt: InputMaybe<Scalars['Date']['input']>;
  readonly lte: InputMaybe<Scalars['Date']['input']>;
  readonly ne: InputMaybe<Scalars['Date']['input']>;
  readonly nei: InputMaybe<Scalars['Date']['input']>;
  readonly not: InputMaybe<DateFilterInput>;
  readonly notContains: InputMaybe<Scalars['Date']['input']>;
  readonly notContainsi: InputMaybe<Scalars['Date']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Date']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly contains: InputMaybe<Scalars['DateTime']['input']>;
  readonly containsi: InputMaybe<Scalars['DateTime']['input']>;
  readonly endsWith: InputMaybe<Scalars['DateTime']['input']>;
  readonly eq: InputMaybe<Scalars['DateTime']['input']>;
  readonly eqi: InputMaybe<Scalars['DateTime']['input']>;
  readonly gt: InputMaybe<Scalars['DateTime']['input']>;
  readonly gte: InputMaybe<Scalars['DateTime']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly lt: InputMaybe<Scalars['DateTime']['input']>;
  readonly lte: InputMaybe<Scalars['DateTime']['input']>;
  readonly ne: InputMaybe<Scalars['DateTime']['input']>;
  readonly nei: InputMaybe<Scalars['DateTime']['input']>;
  readonly not: InputMaybe<DateTimeFilterInput>;
  readonly notContains: InputMaybe<Scalars['DateTime']['input']>;
  readonly notContainsi: InputMaybe<Scalars['DateTime']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['DateTime']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Enum_Componentheaderheaderbackground_Backgroundtype {
  Iframe = 'iframe',
  Image = 'image',
  Slider = 'slider',
  Video = 'video'
}

export enum Enum_Componentpageblockspartner_Partner_Category {
  Apteka = 'Apteka',
  NavchalnijZaklad = 'Navchalnij_zaklad',
  Ustanova = 'Ustanova'
}

export enum Enum_Componentpageblockstwocolumnwithimage_Layout {
  ImageText = 'image_text',
  TextImage = 'text_image'
}

export enum Enum_Cyclecommission_Layout {
  Col_1_8_3 = 'col_1_8_3',
  Col_2_7_3 = 'col_2_7_3',
  Col_8_4 = 'col_8_4',
  Col_9_3 = 'col_9_3',
  Col_12 = 'col_12'
}

export enum Enum_Examschedule_Educationaldegree {
  OppFarmacziyaOpsFahovijMolodshijBakalavr_2020 = 'OPP_Farmacziya_OPS_fahovij_molodshij_bakalavr_2020',
  OppFarmacziyaFahovijMolodshijBakalavr_2023 = 'OPP_Farmacziya_fahovij_molodshij_bakalavr_2023',
  OppFarmacziyaPershogoBakalavrskogoRivnyaVo_2020 = 'OPP_Farmacziya_pershogo_bakalavrskogo_rivnya_VO_2020',
  OppLaboratornaDiagnostikaOpsFahovijMolodshijBakalavr_2020 = 'OPP_Laboratorna_diagnostika_OPS_fahovij_molodshij_bakalavr_2020',
  OppLaboratornaDiagnostikaOpsFahovijMolodshijBakalavr_2023 = 'OPP_Laboratorna_diagnostika_OPS_fahovij_molodshij_bakalavr_2023'
}

export enum Enum_Examschedule_Formofstudy {
  Denna = 'Denna',
  Zaochna = 'Zaochna'
}

export enum Enum_Examschedule_Semester {
  DrugePivrichchya = 'Druge_pivrichchya',
  PershePivrichchya = 'Pershe_pivrichchya',
  Semestr_1 = 'Semestr_1',
  Semestr_2 = 'Semestr_2',
  Semestr_3 = 'Semestr_3',
  Semestr_4 = 'Semestr_4',
  Semestr_5 = 'Semestr_5',
  Semestr_6 = 'Semestr_6'
}

export enum Enum_Examschedule_Specialty {
  FarmacziyaPromislovaFarmacziya_226 = 'Farmacziya_promislova_farmacziya_226',
  TehnologiyiMedichnoyiDiagnostikiTaLikuvannya_224 = 'Tehnologiyi_medichnoyi_diagnostiki_ta_likuvannya_224'
}

export enum Enum_Group_Course_Number {
  Kurs_1 = 'kurs_1',
  Kurs_2 = 'kurs_2',
  Kurs_3 = 'kurs_3'
}

export enum Enum_Group_Educationaldegree {
  OpsFahovijMolodshijBakalavr = 'OPS_Fahovij_molodshij_bakalavr',
  OpsFahovijMolodshijBakalavrNaBazi_9Klasiv = 'OPS_Fahovij_molodshij_bakalavr_na_bazi_9_klasiv',
  OpsFahovijMolodshijBakalavrNaBazi_11Klasiv = 'OPS_Fahovij_molodshij_bakalavr_na_bazi_11_klasiv',
  OrPershijBakalavrskij = 'OR_pershij_bakalavrskij'
}

export enum Enum_Group_Specialty {
  FarmacziyaPromislovaFarmacziya_226 = 'Farmacziya_promislova_farmacziya_226',
  TehnologiyiMedichnoyiDiagnostikiTaLikuvannya_224 = 'Tehnologiyi_medichnoyi_diagnostiki_ta_likuvannya_224'
}

export enum Enum_Page_Layout {
  Col_1_8_3 = 'col_1_8_3',
  Col_2_7_3 = 'col_2_7_3',
  Col_2_8_2 = 'col_2_8_2',
  Col_6_6 = 'col_6_6',
  Col_8_4 = 'col_8_4',
  Col_9_3 = 'col_9_3',
  Col_12 = 'col_12',
  Col_12Container = 'col_12_container'
}

export enum Enum_Partner_Type {
  EducationalInstitution = 'Educational_institution',
  Establishment = 'Establishment',
  Other = 'Other',
  Pharmacy = 'Pharmacy'
}

export enum Enum_Subdivision_Layout {
  Col_1_8_3 = 'col_1_8_3',
  Col_2_7_3 = 'col_2_7_3',
  Col_8_4 = 'col_8_4',
  Col_9_3 = 'col_9_3',
  Col_12 = 'col_12'
}

export enum Enum_Vidilenya_Layout {
  Col_1_8_3 = 'col_1_8_3',
  Col_2_7_3 = 'col_2_7_3',
  Col_8_4 = 'col_8_4',
  Col_9_3 = 'col_9_3',
  Col_12 = 'col_12'
}

export enum Enum_Worker_Category {
  Staff = 'staff',
  Teacher = 'teacher'
}

export enum Enum_Worker_Subdivision {
  Biblioteka = 'Biblioteka',
  Buhgalteriya = 'Buhgalteriya',
  CzivilnijZahist = 'Czivilnij_zahist',
  MonitoringYakostiOsviti = 'Monitoring_yakosti_osviti',
  MuzejKoledzhu = 'Muzej_koledzhu',
  NavchalnijViddil = 'Navchalnij_viddil',
  PervinnaProfspilkovaOrganizacziyaSpivrobitnikiv = 'Pervinna_profspilkova_organizacziya_spivrobitnikiv',
  PsihologichnaSluzhba = 'Psihologichna_sluzhba',
  VihovnaRobota = 'Vihovna_robota',
  ZapobigannyaBulingu = 'Zapobigannya_bulingu'
}

export type Error = {
  readonly __typename?: 'Error';
  readonly code: Scalars['String']['output'];
  readonly message: Maybe<Scalars['String']['output']>;
};

export type Event = {
  readonly __typename?: 'Event';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly date: Scalars['Date']['output'];
  readonly image: UploadFileEntityResponse;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly weight: Scalars['Int']['output'];
};

export type EventEntity = {
  readonly __typename?: 'EventEntity';
  readonly attributes: Maybe<Event>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type EventEntityResponse = {
  readonly __typename?: 'EventEntityResponse';
  readonly data: Maybe<EventEntity>;
};

export type EventEntityResponseCollection = {
  readonly __typename?: 'EventEntityResponseCollection';
  readonly data: ReadonlyArray<EventEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type EventFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<EventFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly date: InputMaybe<DateFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly not: InputMaybe<EventFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<EventFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly weight: InputMaybe<IntFilterInput>;
};

export type EventInput = {
  readonly date: InputMaybe<Scalars['Date']['input']>;
  readonly image: InputMaybe<Scalars['ID']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
  readonly weight: InputMaybe<Scalars['Int']['input']>;
};

export type ExamSchedule = {
  readonly __typename?: 'ExamSchedule';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly educationalDegree: Enum_Examschedule_Educationaldegree;
  readonly formOfStudy: Enum_Examschedule_Formofstudy;
  readonly link: Scalars['String']['output'];
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly semester: Enum_Examschedule_Semester;
  readonly specialty: Enum_Examschedule_Specialty;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ExamScheduleEntity = {
  readonly __typename?: 'ExamScheduleEntity';
  readonly attributes: Maybe<ExamSchedule>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type ExamScheduleEntityResponse = {
  readonly __typename?: 'ExamScheduleEntityResponse';
  readonly data: Maybe<ExamScheduleEntity>;
};

export type ExamScheduleEntityResponseCollection = {
  readonly __typename?: 'ExamScheduleEntityResponseCollection';
  readonly data: ReadonlyArray<ExamScheduleEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type ExamScheduleFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<ExamScheduleFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly educationalDegree: InputMaybe<StringFilterInput>;
  readonly formOfStudy: InputMaybe<StringFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<ExamScheduleFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<ExamScheduleFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly semester: InputMaybe<StringFilterInput>;
  readonly specialty: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type ExamScheduleInput = {
  readonly educationalDegree: InputMaybe<Enum_Examschedule_Educationaldegree>;
  readonly formOfStudy: InputMaybe<Enum_Examschedule_Formofstudy>;
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly semester: InputMaybe<Enum_Examschedule_Semester>;
  readonly specialty: InputMaybe<Enum_Examschedule_Specialty>;
};

export type FileInfoInput = {
  readonly alternativeText: InputMaybe<Scalars['String']['input']>;
  readonly caption: InputMaybe<Scalars['String']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
  readonly contains: InputMaybe<Scalars['Float']['input']>;
  readonly containsi: InputMaybe<Scalars['Float']['input']>;
  readonly endsWith: InputMaybe<Scalars['Float']['input']>;
  readonly eq: InputMaybe<Scalars['Float']['input']>;
  readonly eqi: InputMaybe<Scalars['Float']['input']>;
  readonly gt: InputMaybe<Scalars['Float']['input']>;
  readonly gte: InputMaybe<Scalars['Float']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
  readonly lt: InputMaybe<Scalars['Float']['input']>;
  readonly lte: InputMaybe<Scalars['Float']['input']>;
  readonly ne: InputMaybe<Scalars['Float']['input']>;
  readonly nei: InputMaybe<Scalars['Float']['input']>;
  readonly not: InputMaybe<FloatFilterInput>;
  readonly notContains: InputMaybe<Scalars['Float']['input']>;
  readonly notContainsi: InputMaybe<Scalars['Float']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['Float']['input']>;
};

export type Footer = {
  readonly __typename?: 'Footer';
  readonly address: Scalars['String']['output'];
  readonly copyright: Scalars['String']['output'];
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly email: Scalars['String']['output'];
  readonly logo: UploadFileEntityResponse;
  readonly main_phone: Scalars['String']['output'];
  readonly map_photo: UploadFileEntityResponse;
  readonly map_url: Scalars['String']['output'];
  readonly secondary_phone: Maybe<Scalars['String']['output']>;
  readonly social: ReadonlyArray<Maybe<ComponentUiFooterSocial>>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type FooterSocialArgs = {
  filters: InputMaybe<ComponentUiFooterSocialFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type FooterEntity = {
  readonly __typename?: 'FooterEntity';
  readonly attributes: Maybe<Footer>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type FooterEntityResponse = {
  readonly __typename?: 'FooterEntityResponse';
  readonly data: Maybe<FooterEntity>;
};

export type FooterInput = {
  readonly address: InputMaybe<Scalars['String']['input']>;
  readonly copyright: InputMaybe<Scalars['String']['input']>;
  readonly email: InputMaybe<Scalars['String']['input']>;
  readonly logo: InputMaybe<Scalars['ID']['input']>;
  readonly main_phone: InputMaybe<Scalars['String']['input']>;
  readonly map_photo: InputMaybe<Scalars['ID']['input']>;
  readonly map_url: InputMaybe<Scalars['String']['input']>;
  readonly secondary_phone: InputMaybe<Scalars['String']['input']>;
  readonly social: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiFooterSocialInput>>>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type GenericMorph = Advertisement | ComponentHeaderHeader | ComponentHeaderHeaderBackground | ComponentHeaderSubmenu1 | ComponentHeaderSubmenu2 | ComponentHeaderSubmenu3 | ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImage | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksFrame | ComponentPageBlocksFullSizePerson | ComponentPageBlocksPageCard | ComponentPageBlocksPageCards | ComponentPageBlocksPanorams | ComponentPageBlocksPartner | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | ComponentPagesMeta | ComponentPagesSeo | ComponentUiFooterSocial | ComponentUiHomePageContactItem | ComponentUiHomePageGalleryItem | ComponentUiHomePageStat | ComponentUiIconButton | ComponentUiSocial | CycleCommission | Event | ExamSchedule | Footer | Group | Header | HomePageAbout | HomePageContact | HomePageGallery | HomePageStat | I18NLocale | Lesson | NewsTag | Novina | Page | Panorama | Partner | Seo | Subdivision | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Video | Vidilenya | Worker;

export type Group = {
  readonly __typename?: 'Group';
  readonly calendar_id: Maybe<Scalars['String']['output']>;
  readonly course_number: Enum_Group_Course_Number;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly educationalDegree: Enum_Group_Educationaldegree;
  readonly name: Scalars['String']['output'];
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly specialty: Enum_Group_Specialty;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly vidilenya: Maybe<VidilenyaEntityResponse>;
};

export type GroupEntity = {
  readonly __typename?: 'GroupEntity';
  readonly attributes: Maybe<Group>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type GroupEntityResponse = {
  readonly __typename?: 'GroupEntityResponse';
  readonly data: Maybe<GroupEntity>;
};

export type GroupEntityResponseCollection = {
  readonly __typename?: 'GroupEntityResponseCollection';
  readonly data: ReadonlyArray<GroupEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type GroupFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<GroupFiltersInput>>>;
  readonly calendar_id: InputMaybe<StringFilterInput>;
  readonly course_number: InputMaybe<StringFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly educationalDegree: InputMaybe<StringFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<GroupFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<GroupFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly specialty: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly vidilenya: InputMaybe<VidilenyaFiltersInput>;
};

export type GroupInput = {
  readonly calendar_id: InputMaybe<Scalars['String']['input']>;
  readonly course_number: InputMaybe<Enum_Group_Course_Number>;
  readonly educationalDegree: InputMaybe<Enum_Group_Educationaldegree>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly specialty: InputMaybe<Enum_Group_Specialty>;
  readonly vidilenya: InputMaybe<Scalars['ID']['input']>;
};

export type Header = {
  readonly __typename?: 'Header';
  readonly Header: Maybe<ComponentHeaderHeader>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type HeaderEntity = {
  readonly __typename?: 'HeaderEntity';
  readonly attributes: Maybe<Header>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type HeaderEntityResponse = {
  readonly __typename?: 'HeaderEntityResponse';
  readonly data: Maybe<HeaderEntity>;
};

export type HeaderInput = {
  readonly Header: InputMaybe<ComponentHeaderHeaderInput>;
};

export type HomePageAbout = {
  readonly __typename?: 'HomePageAbout';
  readonly body: Scalars['String']['output'];
  readonly buttonText: Scalars['String']['output'];
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly photo: UploadFileEntityResponse;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type HomePageAboutEntity = {
  readonly __typename?: 'HomePageAboutEntity';
  readonly attributes: Maybe<HomePageAbout>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type HomePageAboutEntityResponse = {
  readonly __typename?: 'HomePageAboutEntityResponse';
  readonly data: Maybe<HomePageAboutEntity>;
};

export type HomePageAboutInput = {
  readonly body: InputMaybe<Scalars['String']['input']>;
  readonly buttonText: InputMaybe<Scalars['String']['input']>;
  readonly photo: InputMaybe<Scalars['ID']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type HomePageContact = {
  readonly __typename?: 'HomePageContact';
  readonly Contacts: ReadonlyArray<Maybe<ComponentUiHomePageContactItem>>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly frame_url: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type HomePageContactContactsArgs = {
  filters: InputMaybe<ComponentUiHomePageContactItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type HomePageContactEntity = {
  readonly __typename?: 'HomePageContactEntity';
  readonly attributes: Maybe<HomePageContact>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type HomePageContactEntityResponse = {
  readonly __typename?: 'HomePageContactEntityResponse';
  readonly data: Maybe<HomePageContactEntity>;
};

export type HomePageContactInput = {
  readonly Contacts: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageContactItemInput>>>;
  readonly frame_url: InputMaybe<Scalars['String']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type HomePageGallery = {
  readonly __typename?: 'HomePageGallery';
  readonly GalleryItems: ReadonlyArray<Maybe<ComponentUiHomePageGalleryItem>>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type HomePageGalleryGalleryItemsArgs = {
  filters: InputMaybe<ComponentUiHomePageGalleryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type HomePageGalleryEntity = {
  readonly __typename?: 'HomePageGalleryEntity';
  readonly attributes: Maybe<HomePageGallery>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type HomePageGalleryEntityResponse = {
  readonly __typename?: 'HomePageGalleryEntityResponse';
  readonly data: Maybe<HomePageGalleryEntity>;
};

export type HomePageGalleryInput = {
  readonly GalleryItems: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageGalleryItemInput>>>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type HomePageStat = {
  readonly __typename?: 'HomePageStat';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly stats: ReadonlyArray<Maybe<ComponentUiHomePageStat>>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type HomePageStatStatsArgs = {
  filters: InputMaybe<ComponentUiHomePageStatFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type HomePageStatEntity = {
  readonly __typename?: 'HomePageStatEntity';
  readonly attributes: Maybe<HomePageStat>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type HomePageStatEntityResponse = {
  readonly __typename?: 'HomePageStatEntityResponse';
  readonly data: Maybe<HomePageStatEntity>;
};

export type HomePageStatInput = {
  readonly stats: InputMaybe<ReadonlyArray<InputMaybe<ComponentUiHomePageStatInput>>>;
};

export type I18NLocale = {
  readonly __typename?: 'I18NLocale';
  readonly code: Maybe<Scalars['String']['output']>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly name: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  readonly __typename?: 'I18NLocaleEntity';
  readonly attributes: Maybe<I18NLocale>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  readonly __typename?: 'I18NLocaleEntityResponse';
  readonly data: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  readonly __typename?: 'I18NLocaleEntityResponseCollection';
  readonly data: ReadonlyArray<I18NLocaleEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<I18NLocaleFiltersInput>>>;
  readonly code: InputMaybe<StringFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<I18NLocaleFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<I18NLocaleFiltersInput>>>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly contains: InputMaybe<Scalars['ID']['input']>;
  readonly containsi: InputMaybe<Scalars['ID']['input']>;
  readonly endsWith: InputMaybe<Scalars['ID']['input']>;
  readonly eq: InputMaybe<Scalars['ID']['input']>;
  readonly eqi: InputMaybe<Scalars['ID']['input']>;
  readonly gt: InputMaybe<Scalars['ID']['input']>;
  readonly gte: InputMaybe<Scalars['ID']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly lt: InputMaybe<Scalars['ID']['input']>;
  readonly lte: InputMaybe<Scalars['ID']['input']>;
  readonly ne: InputMaybe<Scalars['ID']['input']>;
  readonly nei: InputMaybe<Scalars['ID']['input']>;
  readonly not: InputMaybe<IdFilterInput>;
  readonly notContains: InputMaybe<Scalars['ID']['input']>;
  readonly notContainsi: InputMaybe<Scalars['ID']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly contains: InputMaybe<Scalars['Int']['input']>;
  readonly containsi: InputMaybe<Scalars['Int']['input']>;
  readonly endsWith: InputMaybe<Scalars['Int']['input']>;
  readonly eq: InputMaybe<Scalars['Int']['input']>;
  readonly eqi: InputMaybe<Scalars['Int']['input']>;
  readonly gt: InputMaybe<Scalars['Int']['input']>;
  readonly gte: InputMaybe<Scalars['Int']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly lt: InputMaybe<Scalars['Int']['input']>;
  readonly lte: InputMaybe<Scalars['Int']['input']>;
  readonly ne: InputMaybe<Scalars['Int']['input']>;
  readonly nei: InputMaybe<Scalars['Int']['input']>;
  readonly not: InputMaybe<IntFilterInput>;
  readonly notContains: InputMaybe<Scalars['Int']['input']>;
  readonly notContainsi: InputMaybe<Scalars['Int']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']['input']>>>;
  readonly contains: InputMaybe<Scalars['JSON']['input']>;
  readonly containsi: InputMaybe<Scalars['JSON']['input']>;
  readonly endsWith: InputMaybe<Scalars['JSON']['input']>;
  readonly eq: InputMaybe<Scalars['JSON']['input']>;
  readonly eqi: InputMaybe<Scalars['JSON']['input']>;
  readonly gt: InputMaybe<Scalars['JSON']['input']>;
  readonly gte: InputMaybe<Scalars['JSON']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']['input']>>>;
  readonly lt: InputMaybe<Scalars['JSON']['input']>;
  readonly lte: InputMaybe<Scalars['JSON']['input']>;
  readonly ne: InputMaybe<Scalars['JSON']['input']>;
  readonly nei: InputMaybe<Scalars['JSON']['input']>;
  readonly not: InputMaybe<JsonFilterInput>;
  readonly notContains: InputMaybe<Scalars['JSON']['input']>;
  readonly notContainsi: InputMaybe<Scalars['JSON']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['JSON']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['JSON']['input']>;
};

export type Lesson = {
  readonly __typename?: 'Lesson';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly name: Scalars['String']['output'];
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type LessonEntity = {
  readonly __typename?: 'LessonEntity';
  readonly attributes: Maybe<Lesson>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type LessonEntityResponse = {
  readonly __typename?: 'LessonEntityResponse';
  readonly data: Maybe<LessonEntity>;
};

export type LessonEntityResponseCollection = {
  readonly __typename?: 'LessonEntityResponseCollection';
  readonly data: ReadonlyArray<LessonEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type LessonFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<LessonFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<LessonFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<LessonFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type LessonInput = {
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
};

export type LessonRelationResponseCollection = {
  readonly __typename?: 'LessonRelationResponseCollection';
  readonly data: ReadonlyArray<LessonEntity>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  readonly changePassword: Maybe<UsersPermissionsLoginPayload>;
  readonly createAdvertisement: Maybe<AdvertisementEntityResponse>;
  readonly createCycleCommission: Maybe<CycleCommissionEntityResponse>;
  readonly createEvent: Maybe<EventEntityResponse>;
  readonly createExamSchedule: Maybe<ExamScheduleEntityResponse>;
  readonly createGroup: Maybe<GroupEntityResponse>;
  readonly createLesson: Maybe<LessonEntityResponse>;
  readonly createNewsTag: Maybe<NewsTagEntityResponse>;
  readonly createNovina: Maybe<NovinaEntityResponse>;
  readonly createPage: Maybe<PageEntityResponse>;
  readonly createPanorama: Maybe<PanoramaEntityResponse>;
  readonly createPartner: Maybe<PartnerEntityResponse>;
  readonly createSubdivision: Maybe<SubdivisionEntityResponse>;
  readonly createUploadFile: Maybe<UploadFileEntityResponse>;
  readonly createUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  readonly createUsersPermissionsRole: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  readonly createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  readonly createVideo: Maybe<VideoEntityResponse>;
  readonly createVidilenya: Maybe<VidilenyaEntityResponse>;
  readonly createWorker: Maybe<WorkerEntityResponse>;
  readonly deleteAdvertisement: Maybe<AdvertisementEntityResponse>;
  readonly deleteCycleCommission: Maybe<CycleCommissionEntityResponse>;
  readonly deleteEvent: Maybe<EventEntityResponse>;
  readonly deleteExamSchedule: Maybe<ExamScheduleEntityResponse>;
  readonly deleteFooter: Maybe<FooterEntityResponse>;
  readonly deleteGroup: Maybe<GroupEntityResponse>;
  readonly deleteHeader: Maybe<HeaderEntityResponse>;
  readonly deleteHomePageAbout: Maybe<HomePageAboutEntityResponse>;
  readonly deleteHomePageContact: Maybe<HomePageContactEntityResponse>;
  readonly deleteHomePageGallery: Maybe<HomePageGalleryEntityResponse>;
  readonly deleteHomePageStat: Maybe<HomePageStatEntityResponse>;
  readonly deleteLesson: Maybe<LessonEntityResponse>;
  readonly deleteNewsTag: Maybe<NewsTagEntityResponse>;
  readonly deleteNovina: Maybe<NovinaEntityResponse>;
  readonly deletePage: Maybe<PageEntityResponse>;
  readonly deletePanorama: Maybe<PanoramaEntityResponse>;
  readonly deletePartner: Maybe<PartnerEntityResponse>;
  readonly deleteSeo: Maybe<SeoEntityResponse>;
  readonly deleteSubdivision: Maybe<SubdivisionEntityResponse>;
  readonly deleteUploadFile: Maybe<UploadFileEntityResponse>;
  readonly deleteUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  readonly deleteUsersPermissionsRole: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  readonly deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  readonly deleteVideo: Maybe<VideoEntityResponse>;
  readonly deleteVidilenya: Maybe<VidilenyaEntityResponse>;
  readonly deleteWorker: Maybe<WorkerEntityResponse>;
  /** Confirm an email users email address */
  readonly emailConfirmation: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  readonly forgotPassword: Maybe<UsersPermissionsPasswordPayload>;
  readonly login: UsersPermissionsLoginPayload;
  readonly multipleUpload: ReadonlyArray<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  readonly register: UsersPermissionsLoginPayload;
  readonly removeFile: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  readonly resetPassword: Maybe<UsersPermissionsLoginPayload>;
  readonly updateAdvertisement: Maybe<AdvertisementEntityResponse>;
  readonly updateCycleCommission: Maybe<CycleCommissionEntityResponse>;
  readonly updateEvent: Maybe<EventEntityResponse>;
  readonly updateExamSchedule: Maybe<ExamScheduleEntityResponse>;
  readonly updateFileInfo: UploadFileEntityResponse;
  readonly updateFooter: Maybe<FooterEntityResponse>;
  readonly updateGroup: Maybe<GroupEntityResponse>;
  readonly updateHeader: Maybe<HeaderEntityResponse>;
  readonly updateHomePageAbout: Maybe<HomePageAboutEntityResponse>;
  readonly updateHomePageContact: Maybe<HomePageContactEntityResponse>;
  readonly updateHomePageGallery: Maybe<HomePageGalleryEntityResponse>;
  readonly updateHomePageStat: Maybe<HomePageStatEntityResponse>;
  readonly updateLesson: Maybe<LessonEntityResponse>;
  readonly updateNewsTag: Maybe<NewsTagEntityResponse>;
  readonly updateNovina: Maybe<NovinaEntityResponse>;
  readonly updatePage: Maybe<PageEntityResponse>;
  readonly updatePanorama: Maybe<PanoramaEntityResponse>;
  readonly updatePartner: Maybe<PartnerEntityResponse>;
  readonly updateSeo: Maybe<SeoEntityResponse>;
  readonly updateSubdivision: Maybe<SubdivisionEntityResponse>;
  readonly updateUploadFile: Maybe<UploadFileEntityResponse>;
  readonly updateUploadFolder: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  readonly updateUsersPermissionsRole: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  readonly updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  readonly updateVideo: Maybe<VideoEntityResponse>;
  readonly updateVidilenya: Maybe<VidilenyaEntityResponse>;
  readonly updateWorker: Maybe<WorkerEntityResponse>;
  readonly upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateAdvertisementArgs = {
  data: AdvertisementInput;
};


export type MutationCreateCycleCommissionArgs = {
  data: CycleCommissionInput;
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateExamScheduleArgs = {
  data: ExamScheduleInput;
};


export type MutationCreateGroupArgs = {
  data: GroupInput;
};


export type MutationCreateLessonArgs = {
  data: LessonInput;
};


export type MutationCreateNewsTagArgs = {
  data: NewsTagInput;
};


export type MutationCreateNovinaArgs = {
  data: NovinaInput;
};


export type MutationCreatePageArgs = {
  data: PageInput;
};


export type MutationCreatePanoramaArgs = {
  data: PanoramaInput;
};


export type MutationCreatePartnerArgs = {
  data: PartnerInput;
};


export type MutationCreateSubdivisionArgs = {
  data: SubdivisionInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateVideoArgs = {
  data: VideoInput;
};


export type MutationCreateVidilenyaArgs = {
  data: VidilenyaInput;
};


export type MutationCreateWorkerArgs = {
  data: WorkerInput;
};


export type MutationDeleteAdvertisementArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCycleCommissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteExamScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLessonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNewsTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNovinaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePanoramaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePartnerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubdivisionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVideoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVidilenyaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field: InputMaybe<Scalars['String']['input']>;
  files: ReadonlyArray<InputMaybe<Scalars['Upload']['input']>>;
  ref: InputMaybe<Scalars['String']['input']>;
  refId: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAdvertisementArgs = {
  data: AdvertisementInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateCycleCommissionArgs = {
  data: CycleCommissionInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateExamScheduleArgs = {
  data: ExamScheduleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info: InputMaybe<FileInfoInput>;
};


export type MutationUpdateFooterArgs = {
  data: FooterInput;
};


export type MutationUpdateGroupArgs = {
  data: GroupInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateHeaderArgs = {
  data: HeaderInput;
};


export type MutationUpdateHomePageAboutArgs = {
  data: HomePageAboutInput;
};


export type MutationUpdateHomePageContactArgs = {
  data: HomePageContactInput;
};


export type MutationUpdateHomePageGalleryArgs = {
  data: HomePageGalleryInput;
};


export type MutationUpdateHomePageStatArgs = {
  data: HomePageStatInput;
};


export type MutationUpdateLessonArgs = {
  data: LessonInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateNewsTagArgs = {
  data: NewsTagInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateNovinaArgs = {
  data: NovinaInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePanoramaArgs = {
  data: PanoramaInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePartnerArgs = {
  data: PartnerInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSeoArgs = {
  data: SeoInput;
};


export type MutationUpdateSubdivisionArgs = {
  data: SubdivisionInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVideoArgs = {
  data: VideoInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVidilenyaArgs = {
  data: VidilenyaInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWorkerArgs = {
  data: WorkerInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info: InputMaybe<FileInfoInput>;
  ref: InputMaybe<Scalars['String']['input']>;
  refId: InputMaybe<Scalars['ID']['input']>;
};

export type NewsTag = {
  readonly __typename?: 'NewsTag';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type NewsTagEntity = {
  readonly __typename?: 'NewsTagEntity';
  readonly attributes: Maybe<NewsTag>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type NewsTagEntityResponse = {
  readonly __typename?: 'NewsTagEntityResponse';
  readonly data: Maybe<NewsTagEntity>;
};

export type NewsTagEntityResponseCollection = {
  readonly __typename?: 'NewsTagEntityResponseCollection';
  readonly data: ReadonlyArray<NewsTagEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type NewsTagFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<NewsTagFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly not: InputMaybe<NewsTagFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<NewsTagFiltersInput>>>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type NewsTagInput = {
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type NewsTagRelationResponseCollection = {
  readonly __typename?: 'NewsTagRelationResponseCollection';
  readonly data: ReadonlyArray<NewsTagEntity>;
};

export type Novina = {
  readonly __typename?: 'Novina';
  readonly body: Maybe<Scalars['String']['output']>;
  readonly collage_photos: Maybe<UploadFileRelationResponseCollection>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly date: Scalars['Date']['output'];
  readonly main_photo: UploadFileEntityResponse;
  readonly news_tags: Maybe<NewsTagRelationResponseCollection>;
  readonly preview_photo: Maybe<UploadFileEntityResponse>;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly video_url: Maybe<Scalars['String']['output']>;
};


export type NovinaCollage_PhotosArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type NovinaNews_TagsArgs = {
  filters: InputMaybe<NewsTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type NovinaEntity = {
  readonly __typename?: 'NovinaEntity';
  readonly attributes: Maybe<Novina>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type NovinaEntityResponse = {
  readonly __typename?: 'NovinaEntityResponse';
  readonly data: Maybe<NovinaEntity>;
};

export type NovinaEntityResponseCollection = {
  readonly __typename?: 'NovinaEntityResponseCollection';
  readonly data: ReadonlyArray<NovinaEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type NovinaFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<NovinaFiltersInput>>>;
  readonly body: InputMaybe<StringFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly date: InputMaybe<DateFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly news_tags: InputMaybe<NewsTagFiltersInput>;
  readonly not: InputMaybe<NovinaFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<NovinaFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly video_url: InputMaybe<StringFilterInput>;
};

export type NovinaInput = {
  readonly body: InputMaybe<Scalars['String']['input']>;
  readonly collage_photos: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly date: InputMaybe<Scalars['Date']['input']>;
  readonly main_photo: InputMaybe<Scalars['ID']['input']>;
  readonly news_tags: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly preview_photo: InputMaybe<Scalars['ID']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
  readonly video_url: InputMaybe<Scalars['String']['input']>;
};

export type Page = {
  readonly __typename?: 'Page';
  readonly SEO: ComponentPagesSeo;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly layout: Enum_Page_Layout;
  readonly left_sidebar: Maybe<ReadonlyArray<Maybe<PageLeftSidebarDynamicZone>>>;
  readonly main_photo: Maybe<UploadFileEntityResponse>;
  readonly page_components: Maybe<ReadonlyArray<Maybe<PagePageComponentsDynamicZone>>>;
  readonly page_url: Scalars['String']['output'];
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly right_sidebar: Maybe<ReadonlyArray<Maybe<PageRightSidebarDynamicZone>>>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type PageEntity = {
  readonly __typename?: 'PageEntity';
  readonly attributes: Maybe<Page>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type PageEntityResponse = {
  readonly __typename?: 'PageEntityResponse';
  readonly data: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  readonly __typename?: 'PageEntityResponseCollection';
  readonly data: ReadonlyArray<PageEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoFiltersInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<PageFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly layout: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<PageFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<PageFiltersInput>>>;
  readonly page_url: InputMaybe<StringFilterInput>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoInput>;
  readonly layout: InputMaybe<Enum_Page_Layout>;
  readonly left_sidebar: InputMaybe<ReadonlyArray<Scalars['PageLeftSidebarDynamicZoneInput']['input']>>;
  readonly main_photo: InputMaybe<Scalars['ID']['input']>;
  readonly page_components: InputMaybe<ReadonlyArray<Scalars['PagePageComponentsDynamicZoneInput']['input']>>;
  readonly page_url: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly right_sidebar: InputMaybe<ReadonlyArray<Scalars['PageRightSidebarDynamicZoneInput']['input']>>;
  readonly title: InputMaybe<Scalars['String']['input']>;
};

export type PageLeftSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksFrame | ComponentPageBlocksFullSizePerson | ComponentPageBlocksPageCards | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type PagePageComponentsDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksFrame | ComponentPageBlocksFullSizePerson | ComponentPageBlocksPageCards | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type PageRightSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksFrame | ComponentPageBlocksFullSizePerson | ComponentPageBlocksPageCards | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type Pagination = {
  readonly __typename?: 'Pagination';
  readonly page: Scalars['Int']['output'];
  readonly pageCount: Scalars['Int']['output'];
  readonly pageSize: Scalars['Int']['output'];
  readonly total: Scalars['Int']['output'];
};

export type PaginationArg = {
  readonly limit: InputMaybe<Scalars['Int']['input']>;
  readonly page: InputMaybe<Scalars['Int']['input']>;
  readonly pageSize: InputMaybe<Scalars['Int']['input']>;
  readonly start: InputMaybe<Scalars['Int']['input']>;
};

export type Panorama = {
  readonly __typename?: 'Panorama';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly link: Scalars['String']['output'];
  readonly poster: UploadFileEntityResponse;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly weight: Scalars['Int']['output'];
};

export type PanoramaEntity = {
  readonly __typename?: 'PanoramaEntity';
  readonly attributes: Maybe<Panorama>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type PanoramaEntityResponse = {
  readonly __typename?: 'PanoramaEntityResponse';
  readonly data: Maybe<PanoramaEntity>;
};

export type PanoramaEntityResponseCollection = {
  readonly __typename?: 'PanoramaEntityResponseCollection';
  readonly data: ReadonlyArray<PanoramaEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type PanoramaFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<PanoramaFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<PanoramaFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<PanoramaFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly weight: InputMaybe<IntFilterInput>;
};

export type PanoramaInput = {
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly poster: InputMaybe<Scalars['ID']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
  readonly weight: InputMaybe<Scalars['Int']['input']>;
};

export type PanoramaRelationResponseCollection = {
  readonly __typename?: 'PanoramaRelationResponseCollection';
  readonly data: ReadonlyArray<PanoramaEntity>;
};

export type Partner = {
  readonly __typename?: 'Partner';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly link: Scalars['String']['output'];
  readonly logo: UploadFileEntityResponse;
  readonly name: Scalars['String']['output'];
  readonly presentation_link: Maybe<Scalars['String']['output']>;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly type: Enum_Partner_Type;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly weight: Scalars['Int']['output'];
};

export type PartnerEntity = {
  readonly __typename?: 'PartnerEntity';
  readonly attributes: Maybe<Partner>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type PartnerEntityResponse = {
  readonly __typename?: 'PartnerEntityResponse';
  readonly data: Maybe<PartnerEntity>;
};

export type PartnerEntityResponseCollection = {
  readonly __typename?: 'PartnerEntityResponseCollection';
  readonly data: ReadonlyArray<PartnerEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type PartnerFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<PartnerFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly link: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<PartnerFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<PartnerFiltersInput>>>;
  readonly presentation_link: InputMaybe<StringFilterInput>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly type: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly weight: InputMaybe<IntFilterInput>;
};

export type PartnerInput = {
  readonly link: InputMaybe<Scalars['String']['input']>;
  readonly logo: InputMaybe<Scalars['ID']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly presentation_link: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly type: InputMaybe<Enum_Partner_Type>;
  readonly weight: InputMaybe<Scalars['Int']['input']>;
};

export type PartnerRelationResponseCollection = {
  readonly __typename?: 'PartnerRelationResponseCollection';
  readonly data: ReadonlyArray<PartnerEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  readonly __typename?: 'Query';
  readonly advertisement: Maybe<AdvertisementEntityResponse>;
  readonly advertisements: Maybe<AdvertisementEntityResponseCollection>;
  readonly cycleCommission: Maybe<CycleCommissionEntityResponse>;
  readonly cycleCommissions: Maybe<CycleCommissionEntityResponseCollection>;
  readonly event: Maybe<EventEntityResponse>;
  readonly events: Maybe<EventEntityResponseCollection>;
  readonly examSchedule: Maybe<ExamScheduleEntityResponse>;
  readonly examSchedules: Maybe<ExamScheduleEntityResponseCollection>;
  readonly footer: Maybe<FooterEntityResponse>;
  readonly group: Maybe<GroupEntityResponse>;
  readonly groups: Maybe<GroupEntityResponseCollection>;
  readonly header: Maybe<HeaderEntityResponse>;
  readonly homePageAbout: Maybe<HomePageAboutEntityResponse>;
  readonly homePageContact: Maybe<HomePageContactEntityResponse>;
  readonly homePageGallery: Maybe<HomePageGalleryEntityResponse>;
  readonly homePageStat: Maybe<HomePageStatEntityResponse>;
  readonly i18NLocale: Maybe<I18NLocaleEntityResponse>;
  readonly i18NLocales: Maybe<I18NLocaleEntityResponseCollection>;
  readonly lesson: Maybe<LessonEntityResponse>;
  readonly lessons: Maybe<LessonEntityResponseCollection>;
  readonly me: Maybe<UsersPermissionsMe>;
  readonly newsTag: Maybe<NewsTagEntityResponse>;
  readonly newsTags: Maybe<NewsTagEntityResponseCollection>;
  readonly novina: Maybe<NovinaEntityResponse>;
  readonly novinas: Maybe<NovinaEntityResponseCollection>;
  readonly page: Maybe<PageEntityResponse>;
  readonly pages: Maybe<PageEntityResponseCollection>;
  readonly panorama: Maybe<PanoramaEntityResponse>;
  readonly panoramas: Maybe<PanoramaEntityResponseCollection>;
  readonly partner: Maybe<PartnerEntityResponse>;
  readonly partners: Maybe<PartnerEntityResponseCollection>;
  readonly seo: Maybe<SeoEntityResponse>;
  readonly subdivision: Maybe<SubdivisionEntityResponse>;
  readonly subdivisions: Maybe<SubdivisionEntityResponseCollection>;
  readonly uploadFile: Maybe<UploadFileEntityResponse>;
  readonly uploadFiles: Maybe<UploadFileEntityResponseCollection>;
  readonly uploadFolder: Maybe<UploadFolderEntityResponse>;
  readonly uploadFolders: Maybe<UploadFolderEntityResponseCollection>;
  readonly usersPermissionsRole: Maybe<UsersPermissionsRoleEntityResponse>;
  readonly usersPermissionsRoles: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  readonly usersPermissionsUser: Maybe<UsersPermissionsUserEntityResponse>;
  readonly usersPermissionsUsers: Maybe<UsersPermissionsUserEntityResponseCollection>;
  readonly video: Maybe<VideoEntityResponse>;
  readonly videos: Maybe<VideoEntityResponseCollection>;
  readonly vidilenya: Maybe<VidilenyaEntityResponse>;
  readonly vidilenyas: Maybe<VidilenyaEntityResponseCollection>;
  readonly worker: Maybe<WorkerEntityResponse>;
  readonly workers: Maybe<WorkerEntityResponseCollection>;
};


export type QueryAdvertisementArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAdvertisementsArgs = {
  filters: InputMaybe<AdvertisementFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCycleCommissionArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCycleCommissionsArgs = {
  filters: InputMaybe<CycleCommissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryEventArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventsArgs = {
  filters: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryExamScheduleArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryExamSchedulesArgs = {
  filters: InputMaybe<ExamScheduleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryGroupArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGroupsArgs = {
  filters: InputMaybe<GroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryI18NLocaleArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryLessonArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryLessonsArgs = {
  filters: InputMaybe<LessonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryNewsTagArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNewsTagsArgs = {
  filters: InputMaybe<NewsTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryNovinaArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNovinasArgs = {
  filters: InputMaybe<NovinaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPageArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPagesArgs = {
  filters: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPanoramaArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPanoramasArgs = {
  filters: InputMaybe<PanoramaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPartnerArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPartnersArgs = {
  filters: InputMaybe<PartnerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySubdivisionArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySubdivisionsArgs = {
  filters: InputMaybe<SubdivisionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFileArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryVideoArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVideosArgs = {
  filters: InputMaybe<VideoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryVidilenyaArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVidilenyasArgs = {
  filters: InputMaybe<VidilenyaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryWorkerArgs = {
  id: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWorkersArgs = {
  filters: InputMaybe<WorkerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  readonly __typename?: 'ResponseCollectionMeta';
  readonly pagination: Pagination;
};

export type Seo = {
  readonly __typename?: 'Seo';
  readonly SEO: Maybe<ReadonlyArray<Maybe<ComponentPagesMeta>>>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type SeoSeoArgs = {
  filters: InputMaybe<ComponentPagesMetaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type SeoEntity = {
  readonly __typename?: 'SeoEntity';
  readonly attributes: Maybe<Seo>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type SeoEntityResponse = {
  readonly __typename?: 'SeoEntityResponse';
  readonly data: Maybe<SeoEntity>;
};

export type SeoInput = {
  readonly SEO: InputMaybe<ReadonlyArray<InputMaybe<ComponentPagesMetaInput>>>;
};

export type StringFilterInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly between: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly contains: InputMaybe<Scalars['String']['input']>;
  readonly containsi: InputMaybe<Scalars['String']['input']>;
  readonly endsWith: InputMaybe<Scalars['String']['input']>;
  readonly eq: InputMaybe<Scalars['String']['input']>;
  readonly eqi: InputMaybe<Scalars['String']['input']>;
  readonly gt: InputMaybe<Scalars['String']['input']>;
  readonly gte: InputMaybe<Scalars['String']['input']>;
  readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly lt: InputMaybe<Scalars['String']['input']>;
  readonly lte: InputMaybe<Scalars['String']['input']>;
  readonly ne: InputMaybe<Scalars['String']['input']>;
  readonly nei: InputMaybe<Scalars['String']['input']>;
  readonly not: InputMaybe<StringFilterInput>;
  readonly notContains: InputMaybe<Scalars['String']['input']>;
  readonly notContainsi: InputMaybe<Scalars['String']['input']>;
  readonly notIn: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly notNull: InputMaybe<Scalars['Boolean']['input']>;
  readonly null: InputMaybe<Scalars['Boolean']['input']>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
  readonly startsWith: InputMaybe<Scalars['String']['input']>;
};

export type Subdivision = {
  readonly __typename?: 'Subdivision';
  readonly SEO: ComponentPagesSeo;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly layout: Enum_Subdivision_Layout;
  readonly left_sidebar: Maybe<ReadonlyArray<Maybe<SubdivisionLeftSidebarDynamicZone>>>;
  readonly main_photo: UploadFileRelationResponseCollection;
  readonly name: Scalars['String']['output'];
  readonly page_components: Maybe<ReadonlyArray<Maybe<SubdivisionPageComponentsDynamicZone>>>;
  readonly page_url: Scalars['String']['output'];
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly right_sidebar: Maybe<ReadonlyArray<Maybe<SubdivisionRightSidebarDynamicZone>>>;
  readonly slug: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type SubdivisionMain_PhotoArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type SubdivisionEntity = {
  readonly __typename?: 'SubdivisionEntity';
  readonly attributes: Maybe<Subdivision>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type SubdivisionEntityResponse = {
  readonly __typename?: 'SubdivisionEntityResponse';
  readonly data: Maybe<SubdivisionEntity>;
};

export type SubdivisionEntityResponseCollection = {
  readonly __typename?: 'SubdivisionEntityResponseCollection';
  readonly data: ReadonlyArray<SubdivisionEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type SubdivisionFiltersInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoFiltersInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<SubdivisionFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly layout: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<SubdivisionFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<SubdivisionFiltersInput>>>;
  readonly page_url: InputMaybe<StringFilterInput>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly slug: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type SubdivisionInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoInput>;
  readonly layout: InputMaybe<Enum_Subdivision_Layout>;
  readonly left_sidebar: InputMaybe<ReadonlyArray<Scalars['SubdivisionLeftSidebarDynamicZoneInput']['input']>>;
  readonly main_photo: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly page_components: InputMaybe<ReadonlyArray<Scalars['SubdivisionPageComponentsDynamicZoneInput']['input']>>;
  readonly page_url: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly right_sidebar: InputMaybe<ReadonlyArray<Scalars['SubdivisionRightSidebarDynamicZoneInput']['input']>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
};

export type SubdivisionLeftSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type SubdivisionPageComponentsDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type SubdivisionRightSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type UploadFile = {
  readonly __typename?: 'UploadFile';
  readonly alternativeText: Maybe<Scalars['String']['output']>;
  readonly caption: Maybe<Scalars['String']['output']>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly ext: Maybe<Scalars['String']['output']>;
  readonly formats: Maybe<Scalars['JSON']['output']>;
  readonly hash: Scalars['String']['output'];
  readonly height: Maybe<Scalars['Int']['output']>;
  readonly mime: Scalars['String']['output'];
  readonly name: Scalars['String']['output'];
  readonly previewUrl: Maybe<Scalars['String']['output']>;
  readonly provider: Scalars['String']['output'];
  readonly provider_metadata: Maybe<Scalars['JSON']['output']>;
  readonly related: Maybe<ReadonlyArray<Maybe<GenericMorph>>>;
  readonly size: Scalars['Float']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly url: Scalars['String']['output'];
  readonly width: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  readonly __typename?: 'UploadFileEntity';
  readonly attributes: Maybe<UploadFile>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  readonly __typename?: 'UploadFileEntityResponse';
  readonly data: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  readonly __typename?: 'UploadFileEntityResponseCollection';
  readonly data: ReadonlyArray<UploadFileEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  readonly alternativeText: InputMaybe<StringFilterInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<UploadFileFiltersInput>>>;
  readonly caption: InputMaybe<StringFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly ext: InputMaybe<StringFilterInput>;
  readonly folder: InputMaybe<UploadFolderFiltersInput>;
  readonly folderPath: InputMaybe<StringFilterInput>;
  readonly formats: InputMaybe<JsonFilterInput>;
  readonly hash: InputMaybe<StringFilterInput>;
  readonly height: InputMaybe<IntFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly mime: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<UploadFileFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<UploadFileFiltersInput>>>;
  readonly previewUrl: InputMaybe<StringFilterInput>;
  readonly provider: InputMaybe<StringFilterInput>;
  readonly provider_metadata: InputMaybe<JsonFilterInput>;
  readonly size: InputMaybe<FloatFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly url: InputMaybe<StringFilterInput>;
  readonly width: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  readonly alternativeText: InputMaybe<Scalars['String']['input']>;
  readonly caption: InputMaybe<Scalars['String']['input']>;
  readonly ext: InputMaybe<Scalars['String']['input']>;
  readonly folder: InputMaybe<Scalars['ID']['input']>;
  readonly folderPath: InputMaybe<Scalars['String']['input']>;
  readonly formats: InputMaybe<Scalars['JSON']['input']>;
  readonly hash: InputMaybe<Scalars['String']['input']>;
  readonly height: InputMaybe<Scalars['Int']['input']>;
  readonly mime: InputMaybe<Scalars['String']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly previewUrl: InputMaybe<Scalars['String']['input']>;
  readonly provider: InputMaybe<Scalars['String']['input']>;
  readonly provider_metadata: InputMaybe<Scalars['JSON']['input']>;
  readonly size: InputMaybe<Scalars['Float']['input']>;
  readonly url: InputMaybe<Scalars['String']['input']>;
  readonly width: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  readonly __typename?: 'UploadFileRelationResponseCollection';
  readonly data: ReadonlyArray<UploadFileEntity>;
};

export type UploadFolder = {
  readonly __typename?: 'UploadFolder';
  readonly children: Maybe<UploadFolderRelationResponseCollection>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly files: Maybe<UploadFileRelationResponseCollection>;
  readonly name: Scalars['String']['output'];
  readonly parent: Maybe<UploadFolderEntityResponse>;
  readonly path: Scalars['String']['output'];
  readonly pathId: Scalars['Int']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  readonly __typename?: 'UploadFolderEntity';
  readonly attributes: Maybe<UploadFolder>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  readonly __typename?: 'UploadFolderEntityResponse';
  readonly data: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  readonly __typename?: 'UploadFolderEntityResponseCollection';
  readonly data: ReadonlyArray<UploadFolderEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<UploadFolderFiltersInput>>>;
  readonly children: InputMaybe<UploadFolderFiltersInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly files: InputMaybe<UploadFileFiltersInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<UploadFolderFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<UploadFolderFiltersInput>>>;
  readonly parent: InputMaybe<UploadFolderFiltersInput>;
  readonly path: InputMaybe<StringFilterInput>;
  readonly pathId: InputMaybe<IntFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  readonly children: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly files: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly parent: InputMaybe<Scalars['ID']['input']>;
  readonly path: InputMaybe<Scalars['String']['input']>;
  readonly pathId: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  readonly __typename?: 'UploadFolderRelationResponseCollection';
  readonly data: ReadonlyArray<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  readonly __typename?: 'UsersPermissionsCreateRolePayload';
  readonly ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  readonly __typename?: 'UsersPermissionsDeleteRolePayload';
  readonly ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  readonly identifier: Scalars['String']['input'];
  readonly password: Scalars['String']['input'];
  readonly provider: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  readonly __typename?: 'UsersPermissionsLoginPayload';
  readonly jwt: Maybe<Scalars['String']['output']>;
  readonly user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  readonly __typename?: 'UsersPermissionsMe';
  readonly blocked: Maybe<Scalars['Boolean']['output']>;
  readonly confirmed: Maybe<Scalars['Boolean']['output']>;
  readonly email: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly role: Maybe<UsersPermissionsMeRole>;
  readonly username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  readonly __typename?: 'UsersPermissionsMeRole';
  readonly description: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly type: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  readonly __typename?: 'UsersPermissionsPasswordPayload';
  readonly ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  readonly __typename?: 'UsersPermissionsPermission';
  readonly action: Scalars['String']['output'];
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly role: Maybe<UsersPermissionsRoleEntityResponse>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  readonly __typename?: 'UsersPermissionsPermissionEntity';
  readonly attributes: Maybe<UsersPermissionsPermission>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  readonly action: InputMaybe<StringFilterInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly not: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  readonly role: InputMaybe<UsersPermissionsRoleFiltersInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  readonly __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  readonly data: ReadonlyArray<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  readonly email: Scalars['String']['input'];
  readonly password: Scalars['String']['input'];
  readonly username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  readonly __typename?: 'UsersPermissionsRole';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly name: Scalars['String']['output'];
  readonly permissions: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  readonly type: Maybe<Scalars['String']['output']>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly users: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  readonly __typename?: 'UsersPermissionsRoleEntity';
  readonly attributes: Maybe<UsersPermissionsRole>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  readonly __typename?: 'UsersPermissionsRoleEntityResponse';
  readonly data: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  readonly __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  readonly data: ReadonlyArray<UsersPermissionsRoleEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly description: InputMaybe<StringFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<UsersPermissionsRoleFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  readonly permissions: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  readonly type: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly users: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly permissions: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly type: InputMaybe<Scalars['String']['input']>;
  readonly users: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  readonly __typename?: 'UsersPermissionsUpdateRolePayload';
  readonly ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  readonly __typename?: 'UsersPermissionsUser';
  readonly blocked: Maybe<Scalars['Boolean']['output']>;
  readonly confirmed: Maybe<Scalars['Boolean']['output']>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly email: Scalars['String']['output'];
  readonly provider: Maybe<Scalars['String']['output']>;
  readonly role: Maybe<UsersPermissionsRoleEntityResponse>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  readonly __typename?: 'UsersPermissionsUserEntity';
  readonly attributes: Maybe<UsersPermissionsUser>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  readonly __typename?: 'UsersPermissionsUserEntityResponse';
  readonly data: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  readonly __typename?: 'UsersPermissionsUserEntityResponseCollection';
  readonly data: ReadonlyArray<UsersPermissionsUserEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  readonly blocked: InputMaybe<BooleanFilterInput>;
  readonly confirmationToken: InputMaybe<StringFilterInput>;
  readonly confirmed: InputMaybe<BooleanFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly email: InputMaybe<StringFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly not: InputMaybe<UsersPermissionsUserFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  readonly password: InputMaybe<StringFilterInput>;
  readonly provider: InputMaybe<StringFilterInput>;
  readonly resetPasswordToken: InputMaybe<StringFilterInput>;
  readonly role: InputMaybe<UsersPermissionsRoleFiltersInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly username: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  readonly blocked: InputMaybe<Scalars['Boolean']['input']>;
  readonly confirmationToken: InputMaybe<Scalars['String']['input']>;
  readonly confirmed: InputMaybe<Scalars['Boolean']['input']>;
  readonly email: InputMaybe<Scalars['String']['input']>;
  readonly password: InputMaybe<Scalars['String']['input']>;
  readonly provider: InputMaybe<Scalars['String']['input']>;
  readonly resetPasswordToken: InputMaybe<Scalars['String']['input']>;
  readonly role: InputMaybe<Scalars['ID']['input']>;
  readonly username: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  readonly __typename?: 'UsersPermissionsUserRelationResponseCollection';
  readonly data: ReadonlyArray<UsersPermissionsUserEntity>;
};

export type Video = {
  readonly __typename?: 'Video';
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly video_poster: UploadFileEntityResponse;
  readonly video_url: Scalars['String']['output'];
};

export type VideoEntity = {
  readonly __typename?: 'VideoEntity';
  readonly attributes: Maybe<Video>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type VideoEntityResponse = {
  readonly __typename?: 'VideoEntityResponse';
  readonly data: Maybe<VideoEntity>;
};

export type VideoEntityResponseCollection = {
  readonly __typename?: 'VideoEntityResponseCollection';
  readonly data: ReadonlyArray<VideoEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type VideoFiltersInput = {
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<VideoFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly not: InputMaybe<VideoFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<VideoFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly title: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly video_url: InputMaybe<StringFilterInput>;
};

export type VideoInput = {
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly title: InputMaybe<Scalars['String']['input']>;
  readonly video_poster: InputMaybe<Scalars['ID']['input']>;
  readonly video_url: InputMaybe<Scalars['String']['input']>;
};

export type Vidilenya = {
  readonly __typename?: 'Vidilenya';
  readonly SEO: Maybe<ComponentPagesSeo>;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly layout: Enum_Vidilenya_Layout;
  readonly left_sidebar: Maybe<ReadonlyArray<Maybe<VidilenyaLeftSidebarDynamicZone>>>;
  readonly main_photo: Maybe<UploadFileRelationResponseCollection>;
  readonly name: Scalars['String']['output'];
  readonly page_components: Maybe<ReadonlyArray<Maybe<VidilenyaPageComponentsDynamicZone>>>;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly right_sidebar: Maybe<ReadonlyArray<Maybe<VidilenyaRightSidebarDynamicZone>>>;
  readonly slug: Scalars['String']['output'];
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type VidilenyaMain_PhotoArgs = {
  filters: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type VidilenyaEntity = {
  readonly __typename?: 'VidilenyaEntity';
  readonly attributes: Maybe<Vidilenya>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type VidilenyaEntityResponse = {
  readonly __typename?: 'VidilenyaEntityResponse';
  readonly data: Maybe<VidilenyaEntity>;
};

export type VidilenyaEntityResponseCollection = {
  readonly __typename?: 'VidilenyaEntityResponseCollection';
  readonly data: ReadonlyArray<VidilenyaEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type VidilenyaFiltersInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoFiltersInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<VidilenyaFiltersInput>>>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly layout: InputMaybe<StringFilterInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<VidilenyaFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<VidilenyaFiltersInput>>>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly slug: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
};

export type VidilenyaInput = {
  readonly SEO: InputMaybe<ComponentPagesSeoInput>;
  readonly layout: InputMaybe<Enum_Vidilenya_Layout>;
  readonly left_sidebar: InputMaybe<ReadonlyArray<Scalars['VidilenyaLeftSidebarDynamicZoneInput']['input']>>;
  readonly main_photo: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly page_components: InputMaybe<ReadonlyArray<Scalars['VidilenyaPageComponentsDynamicZoneInput']['input']>>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly right_sidebar: InputMaybe<ReadonlyArray<Scalars['VidilenyaRightSidebarDynamicZoneInput']['input']>>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
};

export type VidilenyaLeftSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type VidilenyaPageComponentsDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type VidilenyaRightSidebarDynamicZone = ComponentPageBlocksAccordion | ComponentPageBlocksBody | ComponentPageBlocksButtonImages | ComponentPageBlocksButtonLink | ComponentPageBlocksEducationBooks | ComponentPageBlocksPanorams | ComponentPageBlocksPartnersBlock | ComponentPageBlocksPerson | ComponentPageBlocksPhotosGallery | ComponentPageBlocksTwoColumnWithImage | Error;

export type Worker = {
  readonly __typename?: 'Worker';
  readonly additional_information: Maybe<Scalars['String']['output']>;
  readonly calendar_id: Maybe<Scalars['String']['output']>;
  readonly category: Enum_Worker_Category;
  readonly createdAt: Maybe<Scalars['DateTime']['output']>;
  readonly cycle_commission: Maybe<CycleCommissionEntityResponse>;
  readonly email: Maybe<Scalars['String']['output']>;
  readonly is_administration: Scalars['Boolean']['output'];
  readonly lessons: Maybe<LessonRelationResponseCollection>;
  readonly name: Scalars['String']['output'];
  readonly phone: Maybe<Scalars['String']['output']>;
  readonly photo: Maybe<UploadFileEntityResponse>;
  readonly position: Maybe<Scalars['String']['output']>;
  readonly printed_works: Maybe<Scalars['String']['output']>;
  readonly publishedAt: Maybe<Scalars['DateTime']['output']>;
  readonly slug: Maybe<Scalars['String']['output']>;
  readonly status: Scalars['String']['output'];
  readonly subdivision: Maybe<Enum_Worker_Subdivision>;
  readonly updatedAt: Maybe<Scalars['DateTime']['output']>;
  readonly weight: Scalars['Int']['output'];
};


export type WorkerLessonsArgs = {
  filters: InputMaybe<LessonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>;
};

export type WorkerEntity = {
  readonly __typename?: 'WorkerEntity';
  readonly attributes: Maybe<Worker>;
  readonly id: Maybe<Scalars['ID']['output']>;
};

export type WorkerEntityResponse = {
  readonly __typename?: 'WorkerEntityResponse';
  readonly data: Maybe<WorkerEntity>;
};

export type WorkerEntityResponseCollection = {
  readonly __typename?: 'WorkerEntityResponseCollection';
  readonly data: ReadonlyArray<WorkerEntity>;
  readonly meta: ResponseCollectionMeta;
};

export type WorkerFiltersInput = {
  readonly additional_information: InputMaybe<StringFilterInput>;
  readonly and: InputMaybe<ReadonlyArray<InputMaybe<WorkerFiltersInput>>>;
  readonly calendar_id: InputMaybe<StringFilterInput>;
  readonly category: InputMaybe<StringFilterInput>;
  readonly createdAt: InputMaybe<DateTimeFilterInput>;
  readonly cycle_commission: InputMaybe<CycleCommissionFiltersInput>;
  readonly email: InputMaybe<StringFilterInput>;
  readonly id: InputMaybe<IdFilterInput>;
  readonly is_administration: InputMaybe<BooleanFilterInput>;
  readonly lessons: InputMaybe<LessonFiltersInput>;
  readonly name: InputMaybe<StringFilterInput>;
  readonly not: InputMaybe<WorkerFiltersInput>;
  readonly or: InputMaybe<ReadonlyArray<InputMaybe<WorkerFiltersInput>>>;
  readonly phone: InputMaybe<StringFilterInput>;
  readonly position: InputMaybe<StringFilterInput>;
  readonly printed_works: InputMaybe<StringFilterInput>;
  readonly publishedAt: InputMaybe<DateTimeFilterInput>;
  readonly slug: InputMaybe<StringFilterInput>;
  readonly status: InputMaybe<StringFilterInput>;
  readonly subdivision: InputMaybe<StringFilterInput>;
  readonly updatedAt: InputMaybe<DateTimeFilterInput>;
  readonly weight: InputMaybe<IntFilterInput>;
};

export type WorkerInput = {
  readonly additional_information: InputMaybe<Scalars['String']['input']>;
  readonly calendar_id: InputMaybe<Scalars['String']['input']>;
  readonly category: InputMaybe<Enum_Worker_Category>;
  readonly cycle_commission: InputMaybe<Scalars['ID']['input']>;
  readonly email: InputMaybe<Scalars['String']['input']>;
  readonly is_administration: InputMaybe<Scalars['Boolean']['input']>;
  readonly lessons: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']['input']>>>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly phone: InputMaybe<Scalars['String']['input']>;
  readonly photo: InputMaybe<Scalars['ID']['input']>;
  readonly position: InputMaybe<Scalars['String']['input']>;
  readonly printed_works: InputMaybe<Scalars['String']['input']>;
  readonly publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readonly slug: InputMaybe<Scalars['String']['input']>;
  readonly status: InputMaybe<Scalars['String']['input']>;
  readonly subdivision: InputMaybe<Enum_Worker_Subdivision>;
  readonly weight: InputMaybe<Scalars['Int']['input']>;
};

export type WorkerRelationResponseCollection = {
  readonly __typename?: 'WorkerRelationResponseCollection';
  readonly data: ReadonlyArray<WorkerEntity>;
};

export type HeaderShellFieldsFragment = { readonly __typename?: 'ComponentHeaderHeader', readonly title: string, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly navigation: ReadonlyArray<{ readonly __typename?: 'ComponentHeaderSubmenu1', readonly id: string, readonly text: string, readonly link: string, readonly submenu: ReadonlyArray<{ readonly __typename?: 'ComponentHeaderSubmenu2', readonly id: string, readonly text: string, readonly link: string, readonly submenu: ReadonlyArray<{ readonly __typename?: 'ComponentHeaderSubmenu3', readonly id: string, readonly text: string, readonly link: string } | null> | null } | null> | null } | null> | null, readonly headerIcons: ReadonlyArray<{ readonly __typename?: 'ComponentUiIconButton', readonly id: string, readonly text: string | null, readonly link: string, readonly icon: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> | null, readonly social: { readonly __typename?: 'ComponentUiSocial', readonly text: string | null, readonly icons: ReadonlyArray<{ readonly __typename?: 'ComponentUiIconButton', readonly id: string, readonly text: string | null, readonly link: string, readonly icon: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> } | null };

export type HeaderHeroFieldsFragment = { readonly __typename?: 'ComponentHeaderHeader', readonly title: string, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly headerBackground: { readonly __typename?: 'ComponentHeaderHeaderBackground', readonly backgroundType: Enum_Componentheaderheaderbackground_Backgroundtype, readonly iframe_url: string | null, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly slider: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } | null, readonly video: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly video_poster_primary: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly video_poster_secondary: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly frame_poster: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null } | null };

export type MediaFileAttributesFragment = { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null };

export type MediaFileFieldsFragment = { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null };

export type MediaFileListItemFieldsFragment = { readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null };

export type GetHomeHeroQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeHeroQuery = { readonly __typename?: 'Query', readonly header: { readonly __typename?: 'HeaderEntityResponse', readonly data: { readonly __typename?: 'HeaderEntity', readonly attributes: { readonly __typename?: 'Header', readonly Header: { readonly __typename?: 'ComponentHeaderHeader', readonly title: string, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly headerBackground: { readonly __typename?: 'ComponentHeaderHeaderBackground', readonly backgroundType: Enum_Componentheaderheaderbackground_Backgroundtype, readonly iframe_url: string | null, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly slider: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } | null, readonly video: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly video_poster_primary: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly video_poster_secondary: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly frame_poster: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null } | null } | null } | null } | null } | null, readonly advertisements: { readonly __typename?: 'AdvertisementEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'AdvertisementEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Advertisement', readonly title: string, readonly body: string } | null }> } | null };

export type GetHomePageContentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePageContentQuery = { readonly __typename?: 'Query', readonly homePageAbout: { readonly __typename?: 'HomePageAboutEntityResponse', readonly data: { readonly __typename?: 'HomePageAboutEntity', readonly attributes: { readonly __typename?: 'HomePageAbout', readonly title: string, readonly body: string, readonly buttonText: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null } | null } | null, readonly homePageStat: { readonly __typename?: 'HomePageStatEntityResponse', readonly data: { readonly __typename?: 'HomePageStatEntity', readonly attributes: { readonly __typename?: 'HomePageStat', readonly stats: ReadonlyArray<{ readonly __typename?: 'ComponentUiHomePageStat', readonly id: string, readonly text: string, readonly num: string } | null> } | null } | null } | null, readonly homePageGallery: { readonly __typename?: 'HomePageGalleryEntityResponse', readonly data: { readonly __typename?: 'HomePageGalleryEntity', readonly attributes: { readonly __typename?: 'HomePageGallery', readonly title: string, readonly GalleryItems: ReadonlyArray<{ readonly __typename?: 'ComponentUiHomePageGalleryItem', readonly id: string, readonly title: string, readonly link: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> } | null } | null } | null, readonly homePageContact: { readonly __typename?: 'HomePageContactEntityResponse', readonly data: { readonly __typename?: 'HomePageContactEntity', readonly attributes: { readonly __typename?: 'HomePageContact', readonly title: string, readonly frame_url: string, readonly Contacts: ReadonlyArray<{ readonly __typename?: 'ComponentUiHomePageContactItem', readonly id: string, readonly name: string, readonly position: string, readonly phone: string, readonly email: string } | null> } | null } | null } | null };

export type GetHomeNewsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetHomeNewsQuery = { readonly __typename?: 'Query', readonly novinas: { readonly __typename?: 'NovinaEntityResponseCollection', readonly meta: { readonly __typename?: 'ResponseCollectionMeta', readonly pagination: { readonly __typename?: 'Pagination', readonly total: number, readonly page: number, readonly pageSize: number, readonly pageCount: number } }, readonly data: ReadonlyArray<{ readonly __typename?: 'NovinaEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Novina', readonly title: string, readonly body: string | null, readonly date: string, readonly video_url: string | null, readonly main_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly preview_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly collage_photos: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } | null, readonly news_tags: { readonly __typename?: 'NewsTagRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'NewsTagEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'NewsTag', readonly title: string } | null }> } | null } | null }> } | null };

export type GetHomeEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeEventsQuery = { readonly __typename?: 'Query', readonly events: { readonly __typename?: 'EventEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'EventEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Event', readonly title: string, readonly date: string, readonly weight: number, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null };

export type GetHomePartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePartnersQuery = { readonly __typename?: 'Query', readonly partners: { readonly __typename?: 'PartnerEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PartnerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Partner', readonly name: string, readonly link: string, readonly presentation_link: string | null, readonly type: Enum_Partner_Type, readonly weight: number, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null };

export type GetPageSeoQueryVariables = Exact<{
  pageUrl: Scalars['String']['input'];
}>;


export type GetPageSeoQuery = { readonly __typename?: 'Query', readonly pages: { readonly __typename?: 'PageEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PageEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Page', readonly title: string, readonly page_url: string, readonly SEO: { readonly __typename?: 'ComponentPagesSeo', readonly title: string, readonly description: string | null, readonly meta: ReadonlyArray<{ readonly __typename?: 'ComponentPagesMeta', readonly id: string, readonly name: string, readonly content: string } | null> | null } } | null }> } | null };

export type PageAccordionFieldsFragment = { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string };

export type PageBodyFieldsFragment = { readonly __typename?: 'ComponentPageBlocksBody', readonly id: string, readonly body: string, readonly component_type: string };

export type PageButtonImagesFieldsFragment = { readonly __typename?: 'ComponentPageBlocksButtonImages', readonly id: string, readonly component_type: string, readonly Components: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksButtonImage', readonly id: string, readonly link: string, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> };

export type PageButtonLinkFieldsFragment = { readonly __typename?: 'ComponentPageBlocksButtonLink', readonly id: string, readonly text: string, readonly link: string, readonly component_type: string };

export type PageEducationBooksFieldsFragment = { readonly __typename?: 'ComponentPageBlocksEducationBooks', readonly id: string, readonly description: string, readonly component_type: string, readonly add_container: boolean, readonly main_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly authors: { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string } | null };

export type PagePanoramasFieldsFragment = { readonly __typename?: 'ComponentPageBlocksPanorams', readonly id: string, readonly title: string, readonly component_type: string, readonly withBackground: boolean, readonly panoramas: { readonly __typename?: 'PanoramaRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PanoramaEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Panorama', readonly title: string, readonly link: string, readonly weight: number, readonly poster: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null };

export type PagePartnersBlockFieldsFragment = { readonly __typename?: 'ComponentPageBlocksPartnersBlock', readonly id: string, readonly component_type: string, readonly title: string, readonly partners: { readonly __typename?: 'PartnerRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PartnerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Partner', readonly name: string, readonly link: string, readonly presentation_link: string | null, readonly type: Enum_Partner_Type, readonly weight: number, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null };

export type PagePhotosGalleryFieldsFragment = { readonly __typename?: 'ComponentPageBlocksPhotosGallery', readonly id: string, readonly title: string, readonly component_type: string, readonly images: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } };

export type PageTwoColumnWithImageFieldsFragment = { readonly __typename?: 'ComponentPageBlocksTwoColumnWithImage', readonly id: string, readonly body: string, readonly component_type: string, readonly layout: Enum_Componentpageblockstwocolumnwithimage_Layout, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } };

export type PagePersonFieldsFragment = { readonly __typename?: 'ComponentPageBlocksPerson', readonly id: string, readonly component_type: string, readonly worker: { readonly __typename?: 'WorkerEntityResponse', readonly data: { readonly __typename?: 'WorkerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Worker', readonly name: string, readonly position: string | null, readonly email: string | null, readonly phone: string | null, readonly slug: string | null, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly cycle_commission: { readonly __typename?: 'CycleCommissionEntityResponse', readonly data: { readonly __typename?: 'CycleCommissionEntity', readonly attributes: { readonly __typename?: 'CycleCommission', readonly slug: string | null } | null } | null } | null } | null } | null } | null };

export type PageCardsFieldsFragment = { readonly __typename?: 'ComponentPageBlocksPageCards', readonly id: string, readonly component_type: string, readonly cards: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksPageCard', readonly id: string, readonly name: string, readonly link: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> | null };

export type PageFullSizePersonFieldsFragment = { readonly __typename?: 'ComponentPageBlocksFullSizePerson', readonly id: string, readonly component_type: string, readonly name: string, readonly body: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } };

export type PageFrameFieldsFragment = { readonly __typename?: 'ComponentPageBlocksFrame', readonly id: string, readonly component_type: string, readonly Frame: string };

export type GetPageByPathQueryVariables = Exact<{
  pageUrl: Scalars['String']['input'];
}>;


export type GetPageByPathQuery = { readonly __typename?: 'Query', readonly pages: { readonly __typename?: 'PageEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PageEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Page', readonly title: string, readonly page_url: string, readonly layout: Enum_Page_Layout, readonly SEO: { readonly __typename?: 'ComponentPagesSeo', readonly title: string, readonly description: string | null, readonly meta: ReadonlyArray<{ readonly __typename?: 'ComponentPagesMeta', readonly id: string, readonly name: string, readonly content: string } | null> | null }, readonly main_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly page_components: ReadonlyArray<
          | { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksBody', readonly id: string, readonly body: string, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksButtonImages', readonly id: string, readonly component_type: string, readonly Components: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksButtonImage', readonly id: string, readonly link: string, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> }
          | { readonly __typename?: 'ComponentPageBlocksButtonLink', readonly id: string, readonly text: string, readonly link: string, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksEducationBooks', readonly id: string, readonly description: string, readonly component_type: string, readonly add_container: boolean, readonly main_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly authors: { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string } | null }
          | { readonly __typename?: 'ComponentPageBlocksFrame', readonly id: string, readonly component_type: string, readonly Frame: string }
          | { readonly __typename?: 'ComponentPageBlocksFullSizePerson', readonly id: string, readonly component_type: string, readonly name: string, readonly body: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } }
          | { readonly __typename?: 'ComponentPageBlocksPageCards', readonly id: string, readonly component_type: string, readonly cards: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksPageCard', readonly id: string, readonly name: string, readonly link: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> | null }
          | { readonly __typename?: 'ComponentPageBlocksPanorams', readonly id: string, readonly title: string, readonly component_type: string, readonly withBackground: boolean, readonly panoramas: { readonly __typename?: 'PanoramaRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PanoramaEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Panorama', readonly title: string, readonly link: string, readonly weight: number, readonly poster: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null }
          | { readonly __typename?: 'ComponentPageBlocksPartnersBlock', readonly id: string, readonly component_type: string, readonly title: string, readonly partners: { readonly __typename?: 'PartnerRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PartnerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Partner', readonly name: string, readonly link: string, readonly presentation_link: string | null, readonly type: Enum_Partner_Type, readonly weight: number, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null }
          | { readonly __typename?: 'ComponentPageBlocksPerson', readonly id: string, readonly component_type: string, readonly worker: { readonly __typename?: 'WorkerEntityResponse', readonly data: { readonly __typename?: 'WorkerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Worker', readonly name: string, readonly position: string | null, readonly email: string | null, readonly phone: string | null, readonly slug: string | null, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly cycle_commission: { readonly __typename?: 'CycleCommissionEntityResponse', readonly data: { readonly __typename?: 'CycleCommissionEntity', readonly attributes: { readonly __typename?: 'CycleCommission', readonly slug: string | null } | null } | null } | null } | null } | null } | null }
          | { readonly __typename?: 'ComponentPageBlocksPhotosGallery', readonly id: string, readonly title: string, readonly component_type: string, readonly images: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } }
          | { readonly __typename?: 'ComponentPageBlocksTwoColumnWithImage', readonly id: string, readonly body: string, readonly component_type: string, readonly layout: Enum_Componentpageblockstwocolumnwithimage_Layout, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } }
          | { readonly __typename?: 'Error' }
         | null> | null, readonly right_sidebar: ReadonlyArray<
          | { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksBody', readonly id: string, readonly body: string, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksButtonImages', readonly id: string, readonly component_type: string, readonly Components: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksButtonImage', readonly id: string, readonly link: string, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> }
          | { readonly __typename?: 'ComponentPageBlocksButtonLink', readonly id: string, readonly text: string, readonly link: string, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksEducationBooks', readonly id: string, readonly description: string, readonly component_type: string, readonly add_container: boolean, readonly main_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly authors: { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string } | null }
          | { readonly __typename?: 'ComponentPageBlocksFrame', readonly id: string, readonly component_type: string, readonly Frame: string }
          | { readonly __typename?: 'ComponentPageBlocksFullSizePerson', readonly id: string, readonly component_type: string, readonly name: string, readonly body: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } }
          | { readonly __typename?: 'ComponentPageBlocksPageCards', readonly id: string, readonly component_type: string, readonly cards: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksPageCard', readonly id: string, readonly name: string, readonly link: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> | null }
          | { readonly __typename?: 'ComponentPageBlocksPanorams', readonly id: string, readonly title: string, readonly component_type: string, readonly withBackground: boolean, readonly panoramas: { readonly __typename?: 'PanoramaRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PanoramaEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Panorama', readonly title: string, readonly link: string, readonly weight: number, readonly poster: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null }
          | { readonly __typename?: 'ComponentPageBlocksPartnersBlock', readonly id: string, readonly component_type: string, readonly title: string, readonly partners: { readonly __typename?: 'PartnerRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PartnerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Partner', readonly name: string, readonly link: string, readonly presentation_link: string | null, readonly type: Enum_Partner_Type, readonly weight: number, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null }
          | { readonly __typename?: 'ComponentPageBlocksPerson', readonly id: string, readonly component_type: string, readonly worker: { readonly __typename?: 'WorkerEntityResponse', readonly data: { readonly __typename?: 'WorkerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Worker', readonly name: string, readonly position: string | null, readonly email: string | null, readonly phone: string | null, readonly slug: string | null, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly cycle_commission: { readonly __typename?: 'CycleCommissionEntityResponse', readonly data: { readonly __typename?: 'CycleCommissionEntity', readonly attributes: { readonly __typename?: 'CycleCommission', readonly slug: string | null } | null } | null } | null } | null } | null } | null }
          | { readonly __typename?: 'ComponentPageBlocksPhotosGallery', readonly id: string, readonly title: string, readonly component_type: string, readonly images: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } }
          | { readonly __typename?: 'ComponentPageBlocksTwoColumnWithImage', readonly id: string, readonly body: string, readonly component_type: string, readonly layout: Enum_Componentpageblockstwocolumnwithimage_Layout, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } }
          | { readonly __typename?: 'Error' }
         | null> | null, readonly left_sidebar: ReadonlyArray<
          | { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksBody', readonly id: string, readonly body: string, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksButtonImages', readonly id: string, readonly component_type: string, readonly Components: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksButtonImage', readonly id: string, readonly link: string, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> }
          | { readonly __typename?: 'ComponentPageBlocksButtonLink', readonly id: string, readonly text: string, readonly link: string, readonly component_type: string }
          | { readonly __typename?: 'ComponentPageBlocksEducationBooks', readonly id: string, readonly description: string, readonly component_type: string, readonly add_container: boolean, readonly main_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly authors: { readonly __typename?: 'ComponentPageBlocksAccordion', readonly id: string, readonly title: string, readonly body: string, readonly default_open: boolean, readonly component_type: string } | null }
          | { readonly __typename?: 'ComponentPageBlocksFrame', readonly id: string, readonly component_type: string, readonly Frame: string }
          | { readonly __typename?: 'ComponentPageBlocksFullSizePerson', readonly id: string, readonly component_type: string, readonly name: string, readonly body: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } }
          | { readonly __typename?: 'ComponentPageBlocksPageCards', readonly id: string, readonly component_type: string, readonly cards: ReadonlyArray<{ readonly __typename?: 'ComponentPageBlocksPageCard', readonly id: string, readonly name: string, readonly link: string, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> | null }
          | { readonly __typename?: 'ComponentPageBlocksPanorams', readonly id: string, readonly title: string, readonly component_type: string, readonly withBackground: boolean, readonly panoramas: { readonly __typename?: 'PanoramaRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PanoramaEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Panorama', readonly title: string, readonly link: string, readonly weight: number, readonly poster: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null }
          | { readonly __typename?: 'ComponentPageBlocksPartnersBlock', readonly id: string, readonly component_type: string, readonly title: string, readonly partners: { readonly __typename?: 'PartnerRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'PartnerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Partner', readonly name: string, readonly link: string, readonly presentation_link: string | null, readonly type: Enum_Partner_Type, readonly weight: number, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null }> } | null }
          | { readonly __typename?: 'ComponentPageBlocksPerson', readonly id: string, readonly component_type: string, readonly worker: { readonly __typename?: 'WorkerEntityResponse', readonly data: { readonly __typename?: 'WorkerEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'Worker', readonly name: string, readonly position: string | null, readonly email: string | null, readonly phone: string | null, readonly slug: string | null, readonly photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } | null, readonly cycle_commission: { readonly __typename?: 'CycleCommissionEntityResponse', readonly data: { readonly __typename?: 'CycleCommissionEntity', readonly attributes: { readonly __typename?: 'CycleCommission', readonly slug: string | null } | null } | null } | null } | null } | null } | null }
          | { readonly __typename?: 'ComponentPageBlocksPhotosGallery', readonly id: string, readonly title: string, readonly component_type: string, readonly images: { readonly __typename?: 'UploadFileRelationResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'UploadFileEntity', readonly id: string | null, readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null }> } }
          | { readonly __typename?: 'ComponentPageBlocksTwoColumnWithImage', readonly id: string, readonly body: string, readonly component_type: string, readonly layout: Enum_Componentpageblockstwocolumnwithimage_Layout, readonly image: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } }
          | { readonly __typename?: 'Error' }
         | null> | null } | null }> } | null };

export type GetShellDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShellDataQuery = { readonly __typename?: 'Query', readonly header: { readonly __typename?: 'HeaderEntityResponse', readonly data: { readonly __typename?: 'HeaderEntity', readonly attributes: { readonly __typename?: 'Header', readonly Header: { readonly __typename?: 'ComponentHeaderHeader', readonly title: string, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly navigation: ReadonlyArray<{ readonly __typename?: 'ComponentHeaderSubmenu1', readonly id: string, readonly text: string, readonly link: string, readonly submenu: ReadonlyArray<{ readonly __typename?: 'ComponentHeaderSubmenu2', readonly id: string, readonly text: string, readonly link: string, readonly submenu: ReadonlyArray<{ readonly __typename?: 'ComponentHeaderSubmenu3', readonly id: string, readonly text: string, readonly link: string } | null> | null } | null> | null } | null> | null, readonly headerIcons: ReadonlyArray<{ readonly __typename?: 'ComponentUiIconButton', readonly id: string, readonly text: string | null, readonly link: string, readonly icon: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> | null, readonly social: { readonly __typename?: 'ComponentUiSocial', readonly text: string | null, readonly icons: ReadonlyArray<{ readonly __typename?: 'ComponentUiIconButton', readonly id: string, readonly text: string | null, readonly link: string, readonly icon: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> } | null } | null } | null } | null } | null, readonly footer: { readonly __typename?: 'FooterEntityResponse', readonly data: { readonly __typename?: 'FooterEntity', readonly attributes: { readonly __typename?: 'Footer', readonly copyright: string, readonly map_url: string, readonly title: string, readonly address: string, readonly main_phone: string, readonly secondary_phone: string | null, readonly email: string, readonly logo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly map_photo: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null }, readonly social: ReadonlyArray<{ readonly __typename?: 'ComponentUiFooterSocial', readonly id: string, readonly link: string, readonly icon: { readonly __typename?: 'UploadFileEntityResponse', readonly data: { readonly __typename?: 'UploadFileEntity', readonly attributes: { readonly __typename?: 'UploadFile', readonly name: string, readonly url: string, readonly width: number | null, readonly height: number | null, readonly alternativeText: string | null, readonly formats: unknown | null } | null } | null } } | null> } | null } | null } | null };

export type GetHeaderScheduleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeaderScheduleQuery = { readonly __typename?: 'Query', readonly groups: { readonly __typename?: 'GroupEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'GroupEntity', readonly attributes: { readonly __typename?: 'Group', readonly name: string, readonly course_number: Enum_Group_Course_Number } | null }> } | null, readonly workers: { readonly __typename?: 'WorkerEntityResponseCollection', readonly data: ReadonlyArray<{ readonly __typename?: 'WorkerEntity', readonly attributes: { readonly __typename?: 'Worker', readonly name: string, readonly slug: string | null } | null }> } | null };

export const MediaFileAttributesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}}]} as unknown as DocumentNode<MediaFileAttributesFragment, unknown>;
export const MediaFileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}}]} as unknown as DocumentNode<MediaFileFieldsFragment, unknown>;
export const HeaderShellFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderShellFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentHeaderHeader"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"navigation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"submenu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"submenu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"200"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"headerIcons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"social"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"icons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<HeaderShellFieldsFragment, unknown>;
export const MediaFileListItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileListItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}}]} as unknown as DocumentNode<MediaFileListItemFieldsFragment, unknown>;
export const HeaderHeroFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderHeroFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentHeaderHeader"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"headerBackground"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundType"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileListItemFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video_poster_primary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video_poster_secondary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"iframe_url"}},{"kind":"Field","name":{"kind":"Name","value":"frame_poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileListItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]} as unknown as DocumentNode<HeaderHeroFieldsFragment, unknown>;
export const PageBodyFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageBodyFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksBody"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}}]} as unknown as DocumentNode<PageBodyFieldsFragment, unknown>;
export const PageButtonImagesFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageButtonImagesFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksButtonImages"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"Components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PageButtonImagesFieldsFragment, unknown>;
export const PageButtonLinkFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageButtonLinkFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksButtonLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}}]} as unknown as DocumentNode<PageButtonLinkFieldsFragment, unknown>;
export const PageAccordionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageAccordionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"default_open"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}}]} as unknown as DocumentNode<PageAccordionFieldsFragment, unknown>;
export const PageEducationBooksFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageEducationBooksFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksEducationBooks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"add_container"}},{"kind":"Field","name":{"kind":"Name","value":"main_photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageAccordionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageAccordionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"default_open"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}}]} as unknown as DocumentNode<PageEducationBooksFieldsFragment, unknown>;
export const PagePanoramasFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePanoramasFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPanorams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"panoramas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PagePanoramasFieldsFragment, unknown>;
export const PagePartnersBlockFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePartnersBlockFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPartnersBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"partners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"weight:desc","block":false},{"kind":"StringValue","value":"name:asc","block":false}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"presentation_link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PagePartnersBlockFieldsFragment, unknown>;
export const PagePhotosGalleryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePhotosGalleryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPhotosGallery"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileListItemFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileListItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]} as unknown as DocumentNode<PagePhotosGalleryFieldsFragment, unknown>;
export const PageTwoColumnWithImageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageTwoColumnWithImageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksTwoColumnWithImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"layout"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PageTwoColumnWithImageFieldsFragment, unknown>;
export const PagePersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPerson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"worker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"cycle_commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PagePersonFieldsFragment, unknown>;
export const PageCardsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageCardsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPageCards"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PageCardsFieldsFragment, unknown>;
export const PageFullSizePersonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFullSizePersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksFullSizePerson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<PageFullSizePersonFieldsFragment, unknown>;
export const PageFrameFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFrameFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksFrame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"Frame"}}]}}]} as unknown as DocumentNode<PageFrameFieldsFragment, unknown>;
export const GetHomeHeroDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeHero"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeaderHeroFields"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"advertisements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileListItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderHeroFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentHeaderHeader"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"headerBackground"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundType"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileListItemFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video_poster_primary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video_poster_secondary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"iframe_url"}},{"kind":"Field","name":{"kind":"Name","value":"frame_poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeHeroQuery, GetHomeHeroQueryVariables>;
export const GetHomePageContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomePageContent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"homePageAbout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"buttonText"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"homePageStat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"num"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"homePageGallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"GalleryItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"homePageContact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"Contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"frame_url"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomePageContentQuery, GetHomePageContentQueryVariables>;
export const GetHomeNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"9"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"novinas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"date:desc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"video_url"}},{"kind":"Field","name":{"kind":"Name","value":"main_photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preview_photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collage_photos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"10"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileListItemFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"news_tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileListItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]} as unknown as DocumentNode<GetHomeNewsQuery, GetHomeNewsQueryVariables>;
export const GetHomeEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"weight:desc","block":false},{"kind":"StringValue","value":"date:desc","block":false}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeEventsQuery, GetHomeEventsQueryVariables>;
export const GetHomePartnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomePartners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"not"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"Other","block":false}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"weight:desc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"presentation_link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomePartnersQuery, GetHomePartnersQueryVariables>;
export const GetPageSeoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPageSeo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page_url"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageUrl"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"page_url"}},{"kind":"Field","name":{"kind":"Name","value":"SEO"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPageSeoQuery, GetPageSeoQueryVariables>;
export const GetPageByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPageByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page_url"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageUrl"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"page_url"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"SEO"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"main_photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"page_components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageAccordionFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageBodyFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageButtonImagesFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageButtonLinkFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageEducationBooksFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePanoramasFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePartnersBlockFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePhotosGalleryFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageTwoColumnWithImageFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePersonFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageCardsFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFullSizePersonFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFrameFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"right_sidebar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageAccordionFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageBodyFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageButtonImagesFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageButtonLinkFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageEducationBooksFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePanoramasFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePartnersBlockFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePhotosGalleryFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageTwoColumnWithImageFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePersonFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageCardsFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFullSizePersonFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFrameFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"left_sidebar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageAccordionFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageBodyFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageButtonImagesFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageButtonLinkFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageEducationBooksFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePanoramasFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePartnersBlockFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePhotosGalleryFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageTwoColumnWithImageFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PagePersonFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageCardsFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFullSizePersonFields"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageFrameFields"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageAccordionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"default_open"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileListItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageBodyFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksBody"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageButtonImagesFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksButtonImages"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"Components"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageButtonLinkFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksButtonLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageEducationBooksFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksEducationBooks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"add_container"}},{"kind":"Field","name":{"kind":"Name","value":"main_photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageAccordionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePanoramasFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPanorams"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"panoramas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePartnersBlockFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPartnersBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"partners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"weight:desc","block":false},{"kind":"StringValue","value":"name:asc","block":false}]}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"presentation_link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePhotosGalleryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPhotosGallery"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileListItemFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageTwoColumnWithImageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksTwoColumnWithImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"layout"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PagePersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPerson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"worker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"cycle_commission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageCardsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksPageCards"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFullSizePersonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksFullSizePerson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageFrameFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentPageBlocksFrame"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"component_type"}},{"kind":"Field","name":{"kind":"Name","value":"Frame"}}]}}]} as unknown as DocumentNode<GetPageByPathQuery, GetPageByPathQueryVariables>;
export const GetShellDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShellData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Header"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeaderShellFields"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"footer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"map_url"}},{"kind":"Field","name":{"kind":"Name","value":"map_photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"main_phone"}},{"kind":"Field","name":{"kind":"Name","value":"secondary_phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"social"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileAttributes"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaFileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileEntityResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileAttributes"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeaderShellFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentHeaderHeader"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"navigation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"submenu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"30"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"submenu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"200"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"headerIcons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"social"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"icons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaFileFields"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetShellDataQuery, GetShellDataQueryVariables>;
export const GetHeaderScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHeaderSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"name:asc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"500"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"course_number"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"teacher","block":false}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"StringValue","value":"name:asc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"500"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetHeaderScheduleQuery, GetHeaderScheduleQueryVariables>;