export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      emergency_contacts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone: string
          relationship: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone: string
          relationship: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone?: string
          relationship?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journals: {
        Row: {
          content: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moods: {
        Row: {
          created_at: string | null
          id: string
          note: string | null
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          note?: string | null
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          note?: string | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "moods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          emergency_contact: string | null
          id: string
          language: string | null
          notification_preferences: Json | null
        }
        Insert: {
          created_at?: string | null
          emergency_contact?: string | null
          id: string
          language?: string | null
          notification_preferences?: Json | null
        }
        Update: {
          created_at?: string | null
          emergency_contact?: string | null
          id?: string
          language?: string | null
          notification_preferences?: Json | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string | null
          description: string | null
          dosage: string | null
          frequency: Database["public"]["Enums"]["reminder_frequency"]
          id: string
          location: string | null
          medication_name: string | null
          time: string
          title: string | null
          type: Database["public"]["Enums"]["reminder_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          frequency: Database["public"]["Enums"]["reminder_frequency"]
          id?: string
          location?: string | null
          medication_name?: string | null
          time: string
          title?: string | null
          type: Database["public"]["Enums"]["reminder_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          frequency?: Database["public"]["Enums"]["reminder_frequency"]
          id?: string
          location?: string | null
          medication_name?: string | null
          time?: string
          title?: string | null
          type?: Database["public"]["Enums"]["reminder_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          language: string | null
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          language?: string | null
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          language?: string | null
          title?: string
        }
        Relationships: []
      }
      user_resources: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          resource_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          resource_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_resources_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_resources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      reminder_frequency: "once" | "daily" | "weekly" | "monthly"
      reminder_type: "medication" | "appointment" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      reminder_frequency: ["once", "daily", "weekly", "monthly"],
      reminder_type: ["medication", "appointment", "other"],
    },
  },
} as const
