export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorite_spots: {
        Row: {
          created_at: string | null
          id: string
          spot_id: string
          updated_at: string | null
          user_id: string
          visible: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          spot_id: string
          updated_at?: string | null
          user_id: string
          visible?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          spot_id?: string
          updated_at?: string | null
          user_id?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "favorite_spots_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "spots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_spots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      report_feedback: {
        Row: {
          created_at: string | null
          feedback_comment: string | null
          feedback_type: string
          id: string
          report_id: string
          updated_at: string | null
          user_id: string
          visible: boolean | null
        }
        Insert: {
          created_at?: string | null
          feedback_comment?: string | null
          feedback_type: string
          id?: string
          report_id: string
          updated_at?: string | null
          user_id: string
          visible?: boolean | null
        }
        Update: {
          created_at?: string | null
          feedback_comment?: string | null
          feedback_type?: string
          id?: string
          report_id?: string
          updated_at?: string | null
          user_id?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "report_feedback_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          clarity: string
          created_at: string | null
          flag_not_helpful: boolean | null
          id: string
          max_visibility: number
          min_visibility: number
          points: number
          spot_id: string
          updated_at: string | null
          user_id: string
          visible: boolean | null
        }
        Insert: {
          clarity: string
          created_at?: string | null
          flag_not_helpful?: boolean | null
          id?: string
          max_visibility: number
          min_visibility: number
          points: number
          spot_id: string
          updated_at?: string | null
          user_id: string
          visible?: boolean | null
        }
        Update: {
          clarity?: string
          created_at?: string | null
          flag_not_helpful?: boolean | null
          id?: string
          max_visibility?: number
          min_visibility?: number
          points?: number
          spot_id?: string
          updated_at?: string | null
          user_id?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_spot_id_fkey"
            columns: ["spot_id"]
            isOneToOne: false
            referencedRelation: "spots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spots: {
        Row: {
          created_at: string
          id: string
          last_report_id: string | null
          latitude: number
          location: string
          longitude: number
          max_possible_vis: number
          min_possible_vis: number
          region: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          last_report_id?: string | null
          latitude: number
          location: string
          longitude: number
          max_possible_vis: number
          min_possible_vis: number
          region: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          last_report_id?: string | null
          latitude?: number
          location?: string
          longitude?: number
          max_possible_vis?: number
          min_possible_vis?: number
          region?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          is_admin: boolean | null
          rank: number | null
          updated_at: string | null
          user_grade_points: number
          username: string
          visible: boolean | null
        }
        Insert: {
          created_at?: string | null
          id: string
          is_admin?: boolean | null
          rank?: number | null
          updated_at?: string | null
          user_grade_points?: number
          username: string
          visible?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_admin?: boolean | null
          rank?: number | null
          updated_at?: string | null
          user_grade_points?: number
          username?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
