/* global wpseoAdminL10n */
import { LockClosedIcon } from "@heroicons/react/solid";
import { __, sprintf } from "@wordpress/i18n";
import { addQueryArgs } from "@wordpress/url";
import { useRootContext } from "@yoast/externals/contexts";
import { Badge, useSvgAria, useToggleState } from "@yoast/ui-library";
import { MetaboxButton } from "../MetaboxButton";
import SidebarButton from "../SidebarButton";
import UpsellBox from "../UpsellBox";
import { ModalContainer } from "./Container";
import Modal, { defaultModalClassName } from "./Modal";

/**
 * @returns {JSX.Element} The element.
 */
export const InternalLinkingSuggestionsUpsell = () => {
	const [ isOpen, , , openModal, closeModal ] = useToggleState( false );
	const { locationContext } = useRootContext();
	const svgAriaProps = useSvgAria();

	const isSidebar = locationContext.includes( "sidebar" );
	const isMetabox = locationContext.includes( "metabox" );
	const buyLink = wpseoAdminL10n[
		isSidebar
			? "shortlinks.upsell.sidebar.internal_linking_suggestions"
			: "shortlinks.upsell.metabox.internal_linking_suggestions"
	];

	return (
		<>
			{ isOpen && (
				<Modal
					title={ __( "Get internal linking suggestions", "wordpress-seo" ) }
					onRequestClose={ closeModal }
					additionalClassName=""
					id="yoast-internal-linking-suggestions-upsell"
					className={ defaultModalClassName }
					shouldCloseOnClickOutside={ true }
				>
					<ModalContainer>
						<h2 className="yst-mt-0 yst-mb-4">{ __( "Rank higher by connecting your content", "wordpress-seo" ) }</h2>
						<UpsellBox
							infoParagraphs={ [
								<span key="InternalLinkingSuggestionsUpsell-infoParagraph-description" className="yst-block yst-max-w-[426px]">
									{ sprintf(
										/* translators: %s expands to Yoast SEO Premium. */
										__( "%s automatically suggests to what content you can link with easy drag-and-drop functionality, which is good for your SEO!", "wordpress-seo" ),
										"Yoast SEO Premium"
									) }
								</span>,
								<span
									key="InternalLinkingSuggestionsUpsell-infoParagraph-benefitsTitle"
									className="yst-block yst-my-3 yst-text-[#303030] yst-text-[13px] yst-font-semibold"
								>
									{ __( "What’s more in Yoast SEO Premium?", "wordpress-seo" ) }
								</span>,
							] }
							benefits={ [
								__( "Create content faster: Use AI to create titles & meta descriptions", "wordpress-seo" ),
								__( "Get extra SEO checks with the Premium SEO analysis", "wordpress-seo" ),
								__( "Get help ranking for multiple keyphrases", "wordpress-seo" ),
								__( "Avoid dead links on your site", "wordpress-seo" ),
								__( "Preview how your content looks when shared on social", "wordpress-seo" ),
								__( "Get guidance & save time on routine SEO tasks", "wordpress-seo" ),
							] }
							upsellButtonText={
								sprintf(
									/* translators: %s expands to 'Yoast SEO Premium'. */
									__( "Unlock with %s", "wordpress-seo" ),
									"Yoast SEO Premium"
								)
							}
							upsellButton={ {
								href: addQueryArgs( buyLink, { context: locationContext } ),
								className: "yoast-button-upsell",
								rel: null,
								"data-ctb-id": "f6a84663-465f-4cb5-8ba5-f7a6d72224b2",
								"data-action": "load-nfd-ctb",
							} }
							upsellButtonLabel={ __( "1 year free support and updates included!", "wordpress-seo" ) }
						/>
					</ModalContainer>
				</Modal>
			) }
			{ isSidebar && (
				<SidebarButton
					id="yoast-internal-linking-suggestions-sidebar-modal-open-button"
					title={ __( "Internal linking suggestions", "wordpress-seo" ) }
					onClick={ openModal }
				>
					<div className="yst-root">
						<Badge size="small" variant="upsell">
							<LockClosedIcon className="yst-w-2.5 yst-h-2.5 yst-shrink-0" { ...svgAriaProps } />
						</Badge>
					</div>
				</SidebarButton>
			) }
			{ isMetabox && (
				<div className="yst-root">
					<MetaboxButton
						id="yoast-internal-linking-suggestions-metabox-modal-open-button"
						onClick={ openModal }
					>
						<MetaboxButton.Text>
							{ __( "Internal linking suggestions", "wordpress-seo" ) }
						</MetaboxButton.Text>
						<Badge size="small" variant="upsell">
							<LockClosedIcon className="yst-w-2.5 yst-h-2.5 yst-mr-1 yst-shrink-0" { ...svgAriaProps } />
							<span>Premium</span>
						</Badge>
					</MetaboxButton>
				</div>
			) }
		</>
	);
};
