import sgqlc.types
import sgqlc.types.relay


schema = sgqlc.types.Schema()


# Unexport Node/PageInfo, let schema re-declare them
schema -= sgqlc.types.relay.Node
schema -= sgqlc.types.relay.PageInfo


__docformat__ = 'markdown'


########################################################################
# Scalars and Enumerations
########################################################################
Boolean = sgqlc.types.Boolean

Float = sgqlc.types.Float

ID = sgqlc.types.ID

Int = sgqlc.types.Int

String = sgqlc.types.String


########################################################################
# Input Objects
########################################################################
class CreateAIHubVoiceModelInput(sgqlc.types.Input):
    __schema__ = schema
    __field_names__ = ('creator_text', 'derived_model_id', 'download_count', 'filename', 'name', 'version')
    creator_text = sgqlc.types.Field(String, graphql_name='creatorText')

    derived_model_id = sgqlc.types.Field(ID, graphql_name='derivedModelId')

    download_count = sgqlc.types.Field(sgqlc.types.non_null(Int), graphql_name='downloadCount')

    filename = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='filename')

    name = sgqlc.types.Field(String, graphql_name='name')

    version = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='version')



class CreateVoiceModelBackupUrlInput(sgqlc.types.Input):
    __schema__ = schema
    __field_names__ = ('url', 'voice_model_id')
    url = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='url')

    voice_model_id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='voiceModelId')



class CreateVoiceModelInput(sgqlc.types.Input):
    __schema__ = schema
    __field_names__ = ('checksum_md5_for_added', 'checksum_md5_for_weights', 'checksum_sha256_for_added', 'checksum_sha256_for_weights', 'filesize')
    checksum_md5_for_added = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumMD5ForAdded')

    checksum_md5_for_weights = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumMD5ForWeights')

    checksum_sha256_for_added = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumSHA256ForAdded')

    checksum_sha256_for_weights = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumSHA256ForWeights')

    filesize = sgqlc.types.Field(sgqlc.types.non_null(Int), graphql_name='filesize')



class UpdateAIHubVoiceModelInput(sgqlc.types.Input):
    __schema__ = schema
    __field_names__ = ('creator_text', 'derived_model_id', 'download_count', 'filename', 'id', 'name', 'version')
    creator_text = sgqlc.types.Field(String, graphql_name='creatorText')

    derived_model_id = sgqlc.types.Field(ID, graphql_name='derivedModelId')

    download_count = sgqlc.types.Field(Int, graphql_name='downloadCount')

    filename = sgqlc.types.Field(String, graphql_name='filename')

    id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='id')

    name = sgqlc.types.Field(String, graphql_name='name')

    version = sgqlc.types.Field(String, graphql_name='version')



class UpdateVoiceModelBackupUrlInput(sgqlc.types.Input):
    __schema__ = schema
    __field_names__ = ('id', 'url', 'voice_model_id')
    id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='id')

    url = sgqlc.types.Field(String, graphql_name='url')

    voice_model_id = sgqlc.types.Field(ID, graphql_name='voiceModelId')



class UpdateVoiceModelInput(sgqlc.types.Input):
    __schema__ = schema
    __field_names__ = ('checksum_md5_for_added', 'checksum_md5_for_weights', 'checksum_sha256_for_added', 'checksum_sha256_for_weights', 'filesize', 'id')
    checksum_md5_for_added = sgqlc.types.Field(String, graphql_name='checksumMD5ForAdded')

    checksum_md5_for_weights = sgqlc.types.Field(String, graphql_name='checksumMD5ForWeights')

    checksum_sha256_for_added = sgqlc.types.Field(String, graphql_name='checksumSHA256ForAdded')

    checksum_sha256_for_weights = sgqlc.types.Field(String, graphql_name='checksumSHA256ForWeights')

    filesize = sgqlc.types.Field(Int, graphql_name='filesize')

    id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='id')




########################################################################
# Output Objects and Interfaces
########################################################################
class AIHubVoiceModel(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('backup_urls', 'creator_text', 'derived_model', 'derived_model_id', 'download_count', 'filename', 'id', 'name', 'version')
    backup_urls = sgqlc.types.Field(sgqlc.types.non_null('AIHubVoiceModelBackupUrlsConnection'), graphql_name='backupUrls', args=sgqlc.types.ArgDict((
        ('after', sgqlc.types.Arg(String, graphql_name='after', default=None)),
        ('before', sgqlc.types.Arg(String, graphql_name='before', default=None)),
        ('first', sgqlc.types.Arg(Int, graphql_name='first', default=None)),
        ('last', sgqlc.types.Arg(Int, graphql_name='last', default=None)),
))
    )
    '''Arguments:

    * `after` (`String`)None
    * `before` (`String`)None
    * `first` (`Int`)None
    * `last` (`Int`)None
    '''

    creator_text = sgqlc.types.Field(String, graphql_name='creatorText')

    derived_model = sgqlc.types.Field('VoiceModel', graphql_name='derivedModel')

    derived_model_id = sgqlc.types.Field(ID, graphql_name='derivedModelId')

    download_count = sgqlc.types.Field(sgqlc.types.non_null(Int), graphql_name='downloadCount')

    filename = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='filename')

    id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='id')

    name = sgqlc.types.Field(String, graphql_name='name')

    version = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='version')



class AIHubVoiceModelBackupUrlsConnection(sgqlc.types.relay.Connection):
    __schema__ = schema
    __field_names__ = ('edges', 'page_info')
    edges = sgqlc.types.Field(sgqlc.types.non_null(sgqlc.types.list_of('AIHubVoiceModelBackupUrlsEdge')), graphql_name='edges')

    page_info = sgqlc.types.Field(sgqlc.types.non_null('PageInfo'), graphql_name='pageInfo')



class AIHubVoiceModelBackupUrlsEdge(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('cursor', 'node')
    cursor = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='cursor')

    node = sgqlc.types.Field(sgqlc.types.non_null('VoiceModelBackupUrl'), graphql_name='node')



class AIHubVoiceModelsConnection(sgqlc.types.relay.Connection):
    __schema__ = schema
    __field_names__ = ('edges', 'page_info')
    edges = sgqlc.types.Field(sgqlc.types.non_null(sgqlc.types.list_of('AIHubVoiceModelsEdge')), graphql_name='edges')

    page_info = sgqlc.types.Field(sgqlc.types.non_null('PageInfo'), graphql_name='pageInfo')



class AIHubVoiceModelsEdge(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('cursor', 'node')
    cursor = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='cursor')

    node = sgqlc.types.Field(sgqlc.types.non_null(AIHubVoiceModel), graphql_name='node')



class Mutation(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('create_aihub_voice_model', 'create_voice_model', 'create_voice_model_backup_url', 'update_aihub_voice_model', 'update_voice_model', 'update_voice_model_backup_url')
    create_aihub_voice_model = sgqlc.types.Field(sgqlc.types.non_null(AIHubVoiceModel), graphql_name='createAIHubVoiceModel', args=sgqlc.types.ArgDict((
        ('input', sgqlc.types.Arg(sgqlc.types.non_null(CreateAIHubVoiceModelInput), graphql_name='input', default=None)),
))
    )
    '''Arguments:

    * `input` (`CreateAIHubVoiceModelInput!`)None
    '''

    create_voice_model = sgqlc.types.Field(sgqlc.types.non_null('VoiceModel'), graphql_name='createVoiceModel', args=sgqlc.types.ArgDict((
        ('input', sgqlc.types.Arg(sgqlc.types.non_null(CreateVoiceModelInput), graphql_name='input', default=None)),
))
    )
    '''Arguments:

    * `input` (`CreateVoiceModelInput!`)None
    '''

    create_voice_model_backup_url = sgqlc.types.Field(sgqlc.types.non_null('VoiceModelBackupUrl'), graphql_name='createVoiceModelBackupUrl', args=sgqlc.types.ArgDict((
        ('input', sgqlc.types.Arg(sgqlc.types.non_null(CreateVoiceModelBackupUrlInput), graphql_name='input', default=None)),
))
    )
    '''Arguments:

    * `input` (`CreateVoiceModelBackupUrlInput!`)None
    '''

    update_aihub_voice_model = sgqlc.types.Field(sgqlc.types.non_null(AIHubVoiceModel), graphql_name='updateAIHubVoiceModel', args=sgqlc.types.ArgDict((
        ('input', sgqlc.types.Arg(sgqlc.types.non_null(UpdateAIHubVoiceModelInput), graphql_name='input', default=None)),
))
    )
    '''Arguments:

    * `input` (`UpdateAIHubVoiceModelInput!`)None
    '''

    update_voice_model = sgqlc.types.Field(sgqlc.types.non_null('VoiceModel'), graphql_name='updateVoiceModel', args=sgqlc.types.ArgDict((
        ('input', sgqlc.types.Arg(sgqlc.types.non_null(UpdateVoiceModelInput), graphql_name='input', default=None)),
))
    )
    '''Arguments:

    * `input` (`UpdateVoiceModelInput!`)None
    '''

    update_voice_model_backup_url = sgqlc.types.Field(sgqlc.types.non_null('VoiceModelBackupUrl'), graphql_name='updateVoiceModelBackupUrl', args=sgqlc.types.ArgDict((
        ('input', sgqlc.types.Arg(sgqlc.types.non_null(UpdateVoiceModelBackupUrlInput), graphql_name='input', default=None)),
))
    )
    '''Arguments:

    * `input` (`UpdateVoiceModelBackupUrlInput!`)None
    '''



class PageInfo(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('end_cursor', 'has_next_page', 'has_previous_page', 'start_cursor')
    end_cursor = sgqlc.types.Field(String, graphql_name='endCursor')

    has_next_page = sgqlc.types.Field(sgqlc.types.non_null(Boolean), graphql_name='hasNextPage')

    has_previous_page = sgqlc.types.Field(sgqlc.types.non_null(Boolean), graphql_name='hasPreviousPage')

    start_cursor = sgqlc.types.Field(String, graphql_name='startCursor')



class Query(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('aihub_voice_model', 'aihub_voice_models', 'voice_model', 'voice_model_backup_url', 'voice_model_backup_urls', 'voice_models')
    aihub_voice_model = sgqlc.types.Field('AIHubVoiceModel', graphql_name='AIHubVoiceModel', args=sgqlc.types.ArgDict((
        ('id', sgqlc.types.Arg(sgqlc.types.non_null(ID), graphql_name='id', default=None)),
))
    )
    '''Arguments:

    * `id` (`ID!`)None
    '''

    aihub_voice_models = sgqlc.types.Field(sgqlc.types.non_null(AIHubVoiceModelsConnection), graphql_name='AIHubVoiceModels', args=sgqlc.types.ArgDict((
        ('after', sgqlc.types.Arg(String, graphql_name='after', default=None)),
        ('before', sgqlc.types.Arg(String, graphql_name='before', default=None)),
        ('first', sgqlc.types.Arg(Int, graphql_name='first', default=None)),
        ('last', sgqlc.types.Arg(Int, graphql_name='last', default=None)),
))
    )
    '''Arguments:

    * `after` (`String`)None
    * `before` (`String`)None
    * `first` (`Int`)None
    * `last` (`Int`)None
    '''

    voice_model = sgqlc.types.Field('VoiceModel', graphql_name='VoiceModel', args=sgqlc.types.ArgDict((
        ('id', sgqlc.types.Arg(sgqlc.types.non_null(ID), graphql_name='id', default=None)),
))
    )
    '''Arguments:

    * `id` (`ID!`)None
    '''

    voice_model_backup_url = sgqlc.types.Field('VoiceModelBackupUrl', graphql_name='VoiceModelBackupUrl', args=sgqlc.types.ArgDict((
        ('id', sgqlc.types.Arg(sgqlc.types.non_null(ID), graphql_name='id', default=None)),
))
    )
    '''Arguments:

    * `id` (`ID!`)None
    '''

    voice_model_backup_urls = sgqlc.types.Field(sgqlc.types.non_null('VoiceModelBackupUrlsConnection'), graphql_name='VoiceModelBackupUrls', args=sgqlc.types.ArgDict((
        ('after', sgqlc.types.Arg(String, graphql_name='after', default=None)),
        ('before', sgqlc.types.Arg(String, graphql_name='before', default=None)),
        ('first', sgqlc.types.Arg(Int, graphql_name='first', default=None)),
        ('last', sgqlc.types.Arg(Int, graphql_name='last', default=None)),
))
    )
    '''Arguments:

    * `after` (`String`)None
    * `before` (`String`)None
    * `first` (`Int`)None
    * `last` (`Int`)None
    '''

    voice_models = sgqlc.types.Field(sgqlc.types.non_null('VoiceModelsConnection'), graphql_name='VoiceModels', args=sgqlc.types.ArgDict((
        ('after', sgqlc.types.Arg(String, graphql_name='after', default=None)),
        ('before', sgqlc.types.Arg(String, graphql_name='before', default=None)),
        ('first', sgqlc.types.Arg(Int, graphql_name='first', default=None)),
        ('last', sgqlc.types.Arg(Int, graphql_name='last', default=None)),
))
    )
    '''Arguments:

    * `after` (`String`)None
    * `before` (`String`)None
    * `first` (`Int`)None
    * `last` (`Int`)None
    '''



class VoiceModel(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('checksum_md5_for_added', 'checksum_md5_for_weights', 'checksum_sha256_for_added', 'checksum_sha256_for_weights', 'filesize', 'id', 'source_model')
    checksum_md5_for_added = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumMD5ForAdded')

    checksum_md5_for_weights = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumMD5ForWeights')

    checksum_sha256_for_added = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumSHA256ForAdded')

    checksum_sha256_for_weights = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='checksumSHA256ForWeights')

    filesize = sgqlc.types.Field(sgqlc.types.non_null(Int), graphql_name='filesize')

    id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='id')

    source_model = sgqlc.types.Field(AIHubVoiceModel, graphql_name='sourceModel')



class VoiceModelBackupUrl(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('id', 'url', 'voice_model', 'voice_model_id')
    id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='id')

    url = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='url')

    voice_model = sgqlc.types.Field(sgqlc.types.non_null(AIHubVoiceModel), graphql_name='voiceModel')

    voice_model_id = sgqlc.types.Field(sgqlc.types.non_null(ID), graphql_name='voiceModelId')



class VoiceModelBackupUrlsConnection(sgqlc.types.relay.Connection):
    __schema__ = schema
    __field_names__ = ('edges', 'page_info')
    edges = sgqlc.types.Field(sgqlc.types.non_null(sgqlc.types.list_of('VoiceModelBackupUrlsEdge')), graphql_name='edges')

    page_info = sgqlc.types.Field(sgqlc.types.non_null(PageInfo), graphql_name='pageInfo')



class VoiceModelBackupUrlsEdge(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('cursor', 'node')
    cursor = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='cursor')

    node = sgqlc.types.Field(sgqlc.types.non_null(VoiceModelBackupUrl), graphql_name='node')



class VoiceModelsConnection(sgqlc.types.relay.Connection):
    __schema__ = schema
    __field_names__ = ('edges', 'page_info')
    edges = sgqlc.types.Field(sgqlc.types.non_null(sgqlc.types.list_of('VoiceModelsEdge')), graphql_name='edges')

    page_info = sgqlc.types.Field(sgqlc.types.non_null(PageInfo), graphql_name='pageInfo')



class VoiceModelsEdge(sgqlc.types.Type):
    __schema__ = schema
    __field_names__ = ('cursor', 'node')
    cursor = sgqlc.types.Field(sgqlc.types.non_null(String), graphql_name='cursor')

    node = sgqlc.types.Field(sgqlc.types.non_null(VoiceModel), graphql_name='node')




########################################################################
# Unions
########################################################################

########################################################################
# Schema Entry Points
########################################################################
schema.query_type = Query
schema.mutation_type = Mutation
schema.subscription_type = None

