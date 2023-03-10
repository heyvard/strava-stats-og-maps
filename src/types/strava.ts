export interface Activity {
    resource_state: number
    name: string
    distance: number
    moving_time: number
    elapsed_time: number
    total_elevation_gain: number
    type: string
    sport_type: string
    id: any
    start_date: Date
    start_date_local: Date
    timezone: string
    utc_offset: number
    location_city?: any
    location_state?: any
    location_country: string
    achievement_count: number
    kudos_count: number
    comment_count: number
    athlete_count: number
    photo_count: number
    map?: Map
    trainer: boolean
    commute: boolean
    manual: boolean
    private: boolean
    visibility: string
    flagged: boolean
    gear_id: string
    start_latlng: number[]
    end_latlng: number[]
    average_speed: number
    max_speed: number
    average_temp: number
    has_heartrate: boolean
    average_heartrate: number
    max_heartrate: number
    heartrate_opt_out: boolean
    display_hide_heartrate_option: boolean
    elev_high: number
    elev_low: number
    upload_id: any
    upload_id_str: string
    external_id: string
    from_accepted_tag: boolean
    pr_count: number
    total_photo_count: number
    has_kudoed: boolean
    suffer_score: number
    average_cadence?: number
    workout_type?: number
    average_watts?: number
    max_watts?: number
    weighted_average_watts?: number
    kilojoules?: number
    device_watts?: boolean
}

export interface Map {
    id: string
    summary_polyline: string
    resource_state: number
}

export interface Token {
    token_type: string
    access_token: string
    expires_at: number
    refresh_token: number
}
